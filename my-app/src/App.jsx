import './App.css'
import { CommonData } from './Common'
import AppNav from './layouts/AppNav'
import Addmovie from './pages/Addmovie'
import Adminpage from './pages/Adminpage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Userpage from './pages/Userpage'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <CommonData>
     <AppNav></AppNav>
     <Routes>
      <Route path='/' Component={Login}></Route> 
      <Route path='/signup' Component={Signup}></Route>
      <Route path='/users/allmovie' Component={Userpage}></Route>
      <Route path='/admin/addmovie' Component={Addmovie}></Route>
      <Route path='/admin/dashboard' Component={Adminpage}></Route>
     </Routes>
    </CommonData>
  )
}

export default App
