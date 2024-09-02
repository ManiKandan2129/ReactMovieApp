import React, { createContext, useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Common = createContext();


const registerdata = {
  username:"",
  email:"",
  phone:"",
  password:"",
  usertype:"",
}
const logindata = {
  email:"",
  password:"",
}
const moviedata = {
  moviename:"",
  movieimg:"",
  genre:"",
  description:"",
  director:"",
  duration:0,
  releasedate:"",
  rating:[],
}

function CommonData({children}) {
  const[signupInfo, setsignupInfo] = useState(registerdata);
  const[LoginInfo, setLoginInfo] = useState(logindata);
  const[MovieInfo, setMovieInfo] = useState(moviedata);
  const[movies, setmovies] = useState([]);
  const [show, setShow] = useState(false);
  const[users, setusers] = useState([]);
  const[edit, setedit] = useState(null);
  const[isAdded, setisAdded] = useState(false);
  const[isEdited, setisEdited] = useState(false);
  const[isDeleted, setisDeleted] = useState(false);
  const[logged, setlogged] = useState(false);
  const[isUserDeleted, setisUserDeleted] = useState(false);
  const[rateVal, setrateVal] = useState(movies.map((val)=>val._id))
  const [userType, setUserType] = useState('user');
  const[secretkey, setsecretkey] = useState("");
  const secretcode = "Xauth-Movie-Admin"
  const[isAdmin, setisAdmin] = useState(false);
  const[Rating, setRating] = useState({rating:1});
  const[isRated, setisRated] = useState(false);
  const[err, setErr] = useState("");

  
  const navigate = useNavigate();
//admin page canvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//getting datas from sigup form 
  const FormChange = (e)=>{
    const{name,value} = e.target;
    setsignupInfo({...signupInfo,[name]:value, usertype:userType,})
  
  }
  
//adding new user to a database using signup form
  const FormSubmit = async(event)=>{
    if(userType === "admin" && secretcode !== secretkey){
      event.preventDefault();
      alert("Invalid Authorization")
    } else{
      event.preventDefault();
      await axios.post("http://localhost:8090/api/user/signup", signupInfo).then((response)=>{
          setsignupInfo({...signupInfo, username:"", email:"", phone:"", password:"",});
          //adding token to local storage
          if(response.data.token){
            localStorage.setItem("token", response.data.token);
          } 
          if(response.data.data.usertype === "admin"){
            navigate('/admin/dashboard')
          }else{
            navigate('/users/allmovie')
          }
          setlogged(!logged);
      })
      .catch((err) => {
        setErr(err.response.data.err);
      });
    }
  };

//getting datas from login form
  const handleLoginData = (e)=>{
    const{name,value} = e.target;
    setLoginInfo({...LoginInfo,[name]:value,})
  }

//login as existing user
  const handleLogin = async(event)=>{
    event.preventDefault();
    await axios.post("http://localhost:8090/api/user/login", LoginInfo).then((response)=>{
      setLoginInfo({...LoginInfo, email:"", password:"",});
      
      //adding token to local storage
      if(response.data.token){
        localStorage.setItem("token", response.data.token);
        setlogged(!logged);
      } 
      if(response.data.data.usertype === "admin"){
        navigate('/admin/dashboard')
      }else{
        navigate('/users/allmovie')
      }
    })
    .catch((error) => {
      setErr(error.response.data.error);
    });
  } 

//handle logout 
const handleLogout = ()=>{
  localStorage.removeItem("token");
  navigate('/');
}

//getting datas from addmovie form
  const handleMovieData = (e)=>{
    const{name,value} = e.target;
    setMovieInfo({...MovieInfo,[name]:value,})
  } 

//adding movie datas to database
  const HandleAddMovie = async(event)=>{
    event.preventDefault();
    if(!localStorage.getItem("token")){
      navigate('/', {replace:true})
      }
    await axios.post("http://localhost:8090/api/movies/admin/addmovies", MovieInfo,
    {headers:{"authenticate-token":localStorage.getItem("token")}}).then((response)=>{
      setMovieInfo({...MovieInfo,
      moviename:"",
      movieimg:"",
      genre:"",
      description:"",
      director:"",
      duration:0,
      releasedate:"", })
      console.log(response.data)
    })
    navigate("/admin/dashboard")
    setisAdded(!isAdded);
  }

//getting all movies for users
   useEffect(()=>{
    if(!localStorage.getItem("token")){
    navigate('/', {replace:true})
    }
    const handleGetData = async()=>{
        await axios.get("http://localhost:8090/api/movies/allmovies",
        {headers:{"authenticate-token":localStorage.getItem("token"),}})
        .then((response)=>{
            setmovies(response.data.data)      
        })
        await axios.get("http://localhost:8090/api/user/admin/userdetails",
      {headers:{"authenticate-token":localStorage.getItem("token"),'Content-Type': 'application/json',}})
      .then((response)=>{
        setusers(response.data.data)
      })
    }
    handleGetData();
    

},[isAdded, isEdited, isDeleted, logged, isUserDeleted, isRated]);

//edit movies
  const handleEdit = async(id)=>{
    const editdata = movies.find((data)=>data._id === id);
    if(editdata){
      setMovieInfo({...MovieInfo,
        moviename: editdata.moviename,
        movieimg: editdata.movieimg,
        genre: editdata.genre,
        description: editdata.description,
        director: editdata.director ,
        duration: editdata.duration,
        releasedate: editdata.releasedate,
        rating: editdata.rating, })
    }
    setedit(editdata._id)
    navigate('/admin/addmovie')
  }  
//update the edit values
  const handleupdate = async()=>{
    await axios.put(`http://localhost:8090/api/movies/admin/edit/${edit}`, MovieInfo,
    {headers:{"authenticate-token":localStorage.getItem("token"),'Content-Type': 'application/json',}}).then((response)=>{
      setMovieInfo({...MovieInfo,
        moviename:"",
        movieimg:"",
        genre:"",
        description:"",
        director:"",
        duration:0,
        releasedate:"",
        rating:[],
       })
      })
      navigate("/admin/dashboard")
      setedit(null)
      setisEdited(!isEdited);
  }

//delete movies
  const handleDelete = async (id)=>{
    await axios.delete(`http://localhost:8090/api/movies/admin/delete/${id}`,
    {headers:{"authenticate-token":localStorage.getItem("token"),'Content-Type': 'application/json',}})
    setisDeleted(!isDeleted);
  }

//delete users
  const handleUserDelete = async(id)=>{
    await axios.delete(`http://localhost:8090/api/user/admin/userdelete/${id}`,
    {headers:{"authenticate-token":localStorage.getItem("token"),'Content-Type': 'application/json',}})
    setisUserDeleted(!isUserDeleted);
  }

//functioning of addmovie cancel button
  const handleCancel = ()=>{
    setMovieInfo({...MovieInfo,
      moviename:"",
      movieimg:"",
      genre:"",
      description:"",
      director:"",
      duration:0,
      releasedate:"", })
    navigate("/admin/dashboard")
  }

//rate movies
  const handleRate = async(id)=>{
    await axios.put(`http://localhost:8090/api/movies/users/rating/${id}`,Rating,
    {headers:{"authenticate-token":localStorage.getItem("token"),'Content-Type': 'application/json',}}).then((response)=>{
     setRating({...Rating,rating:1})
     setisRated(!isRated)
    })
  }  

//average ratings
  const avgrate = (num)=>{
    if(num.length === 0){
      return "No ratings";
    } else {
    let total = 0;
    for(let i =0; i<=num.length; i++){
      if(!isNaN(num[i])){
        total += parseInt(num[i])
      }
    }
    total = total/num.length;
    return total.toFixed(1);
  }
  }

  return (
    <Common.Provider value={{ 
      signupInfo,
      setsignupInfo,
      FormChange,
      FormSubmit,
      LoginInfo,
      handleLoginData,
      handleLogin,
      MovieInfo,
      handleMovieData,
      HandleAddMovie,
      handleLogout,
      movies,
      setmovies,
      handleClose,
      handleShow,
      show,
      users,
      handleEdit,
      edit,
      handleupdate,
      handleDelete,
      handleCancel,
      handleUserDelete,
      userType,
      setUserType,
      secretkey,
      setsecretkey,
      Rating,
      setRating,
      handleRate,
      avgrate,
      err

     }}>
        {children}
    </Common.Provider>
  )
}

export {Common, CommonData}