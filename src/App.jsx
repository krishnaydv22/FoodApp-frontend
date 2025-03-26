
// import './App.css'
import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './Theme/DarkTheme'
import { CssBaseline } from '@mui/material'
import Home from './Components/Home/Home'
import RestaurantDetails from './Components/Restaurant/RestaurantDetails'
import Cart from './Components/Cart/Cart'
import Profile from './Components/Profile/Profile'
import CustomerRouter from './Routers/CustomerRouter'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Components/State/Authentication/Action'
import { findCartApi } from './Components/State/Cart/Action'
import Routers from './Routers/Routers'
import { getAllRestaurantsApi, getRestaurantByIdApi, getRestaurantByUserIdApi } from './Components/State/Restaurant/Action'




function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const { auth } = useSelector((store) => store)

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCartApi(jwt));
  },[auth.jwt])

  useEffect(() => {
    dispatch(getRestaurantByUserIdApi(auth.jwt || jwt));
  },[auth.user])

   useEffect(() => {
     dispatch(getAllRestaurantsApi(jwt))
    },[])
 

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <div>
    <Routers />
     
    </div>
   
    
        
    </ThemeProvider>
  )
}

export default App
