import React, { useEffect } from 'react'
import EventCard from './EventCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsApi } from '../State/Restaurant/Action';

const Events = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurant} = useSelector((store) => store);

    useEffect(() => {
      dispatch(getAllEventsApi({jwt}));
    },[])

    

    

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {restaurant.events.map((item) => <EventCard event={item}/>)}

    
      
    </div>
  )
}

export default Events
