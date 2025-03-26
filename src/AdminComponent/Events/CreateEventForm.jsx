import { Button, Grid, Modal, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventApi } from "../../Components/State/Restaurant/Action";

const initialValues = {
  image: "",
  location: "",
  name:"",
  startedAt:null,
  endsAt:null

}

const CreateEventForm = ({item}) => {

  const [formData, setFormData] = useState(initialValues);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector((store) => store);


   
 

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date,dateType) => {
    if (date) {
      const formattedDate = dayjs(date).format("MMMM DD, YYYY hh:mm A");
      setFormData({ ...formData, [dateType]: formattedDate }); // Store as formatted string
    } else {
      setFormData({ ...formData, [dateType]: null });
    }
    
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(initialValues);
    dispatch(createEventApi({data:formData,restaurantId:restaurant.usersRestaurant?.id,jwt}))

   
    
  };

  
  

  
  return (
    <div className="">
      <div className="p-5">
        <h1  className="text-gray-400 text-center text-xl pb-8">
          Create Event
        </h1>
      

        <form className="space-y-4" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                     <TextField
                                fullWidth
                                id="image"
                                name="image"
                                label="Image URL"
                                variant="outlined"
                                onChange={handleFormChange}
                                value={formData.image}
                              ></TextField>


                </Grid>

                <Grid item xs={12}>
                     <TextField
                                fullWidth
                                id="location"
                                name="location"
                                label="Location"
                                variant="outlined"
                                onChange={handleFormChange}
                                value={formData.location}
                              ></TextField>


                </Grid>

                <Grid item xs={12}>
                     <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Event Name"
                                variant="outlined"
                                onChange={handleFormChange}
                                value={formData.name}
                              ></TextField>


                </Grid>

              <Grid item xs={12}>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
               
                  <DateTimePicker 

                  renderInput = {(props) => <TextField {...props} />}
                  label="start Date and Time" 
                  value={formData.startedAt ? dayjs(formData.startedAt, "MMMM DD, YYYY hh:mm A") : null}
                  onChange={(newValue) => handleDateChange(newValue, "startedAt")}
                  format="MMMM DD YYYY hh:mm A"
                  className="w-full"
                  sx={{ width: "100%" }}
                  />
               
              </LocalizationProvider>
           </Grid>
              <Grid item xs={12}>

                <LocalizationProvider dateAdapter={AdapterDayjs}>

                  <DateTimePicker 

                  renderInput = {(props) => <TextField {...props} />}
                  label="End Date and Time" 
                  value={formData.endsAt ? dayjs(formData.endsAt, "MMMM DD, YYYY hh:mm A") : null} // Convert back to Dayjs
                  onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                  inputFormat="MMMM DD YYYY hh:mm A"
                  className="w-full"
                  sx={{ width: "100%" }}
                  />

                </LocalizationProvider>
                </Grid>

            </Grid>

            <Button type="submit" variant="contained">Submit</Button>
         
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
