import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = ({event}) => {
    
  return (
    <div>
        <Card sx={{width:345}}>
            <CardMedia sx={{height: 345}}
             image={event.image} />
        
        <CardContent> 
            <Typography variant='h5'>
            {event.name}
            </Typography>
            <Typography variant='body2'>
            {event.location}
            </Typography>
            <div className='py-2 space-y-2'>
                <p>{"Mumbai"}</p>
                <p className='text-sm text-blue-500'>{event.startedAt}</p>
                <p className='text-sm text-red-500'>{event.endsAt}</p>

            </div>
        </CardContent>
     
        </Card>
      
    </div>
  )
}

export default EventCard
