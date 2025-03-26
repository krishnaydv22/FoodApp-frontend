import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
// import Dashboard from '../Dashboard/Dashboard'
import Orders from '../Orders/Orders'
import Menu from '../Menu/Menu'
import FoodCategory from '../Food Category/FoodCategory'
import Ingredients from '../Ingredients/Ingredients'
import Events from '../Events/Events'
import RestaurantDetails from './RestaurantDetails'
import RestaurantDashboard from '../Dashboard/Dashboard'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantByIdApi, getRestaurantsCategoryApi } from '../../Components/State/Restaurant/Action'
import { getMenuItemByIdApi } from '../../Components/State/Menu/Action'
import { fetchRestaurantsOrderApi } from '../../Components/State/Restaurant Order/Action'

const Admin = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector((store) => store);



    const handleClose = () => {

    }
  
    useEffect(() => {
      dispatch(getRestaurantsCategoryApi({jwt,restaurantId:restaurant.usersRestaurant?.id}));
      dispatch(fetchRestaurantsOrderApi({jwt,restaurantId:restaurant.usersRestaurant?.id}))
      // dispatch(getMenuItemByIdApi());
      // dispatch(getRestaurantByIdApi())
    },[])


  return (
    <div>
        <div className='lg:flex justify-between'>
           
            <div>
                <AdminSideBar handleClose={handleClose}/>
            </div>
            <div className='lg:w-[80%]'>
                <Routes>
                    <Route path='/' element= {<RestaurantDashboard />}/>
                    <Route path='/orders' element= {<Orders />}/>
                    <Route path='/menu' element= {<Menu />}/>
                    <Route path='/category' element= {<FoodCategory />}/>
                    <Route path='/ingredients' element= {<Ingredients />}/>
                    <Route path='/events' element= {<Events />}/>
                    <Route path='/details' element= {<RestaurantDetails />}/>
                    <Route path='/add-menu' element= {<CreateMenuForm />}/>

          </Routes>

            </div>

        </div>
      
    </div>
  )
}

export default Admin
