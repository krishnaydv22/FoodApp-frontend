import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { deleteEventApi, getRestaurantsEventApi } from "../../Components/State/Restaurant/Action";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";


const EventCard = ({item}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector((store) => store);

   useEffect(() => {
        dispatch(getRestaurantsEventApi({restaurantId:restaurant.usersRestaurant?.id,jwt}))
      },[])

      const handleDelete = (id) => {
       dispatch(deleteEventApi({eventId:id,jwt}))
      };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {restaurant.restaurantsEvents.map((event) => (
        <Card key={event.id} className="relative rounded-2xl shadow-lg hover:shadow-xl transition">
          <IconButton
            className="absolute top-0 left-0 bg-white"
            onClick={() => handleDelete(event.id)}
          >
            <Delete color="error" />
          </IconButton>
          <CardMedia
            component="img"
            height="200"
            image={event.image}
            alt={event.name}
            className="rounded-t-2xl"
          />
          <CardContent>
            <Typography variant="h6" className="font-semibold">
              {event.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              📍 {event.location}
            </Typography>
            <Typography variant="body2" className="mt-2">
              🕒 {event.startedAt} - {event.endsAt}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventCard;
