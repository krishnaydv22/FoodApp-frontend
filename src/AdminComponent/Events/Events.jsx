import { Box, Button, Modal } from '@mui/material'
import React, { useEffect } from 'react'
import CreateEventForm from './CreateEventForm';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from './EventCard';
import { getRestaurantsEventApi } from '../../Components/State/Restaurant/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Events = () => {

  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector((store) => store);

  useEffect(() => {
      dispatch(getRestaurantsEventApi({restaurantId:restaurant.usersRestaurant?.id,jwt}))
    },[])

 
return (
    <div>
      <div className='p-5'>
        <Button  onClick={handleOpen}  variant='contained'>Create New Event</Button>


        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

         <CreateEventForm />
         
        </Box>
      </Modal>


      </div>
      <div>

       <EventCard />

      </div>


    </div>
  )
}

export default Events

