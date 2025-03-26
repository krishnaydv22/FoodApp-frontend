import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudinary } from "../utils/UploadToCloudaniry";
import Ingredients from "../Ingredients/Ingredients";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItemApi } from "../../Components/State/Menu/Action";
import { getIngredientsOfRestaurantApi } from "../../Components/State/Ingredients/Action";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegitarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};


const CreateMenuForm = () => {

 const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant,ingredients} = useSelector((store) => store);
  

  const [uploadImage, setUploadImage] = useState(false);

       useEffect(() =>{
          dispatch(getIngredientsOfRestaurantApi({jwt,id:restaurant.usersRestaurant?.id}))
        },[])

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      //      const data = {
      //       name:values.name,
      //       description:values.description,
      //       cuisineType:values.cuisineType,
      //       address:{
      //                 streetAddress:values.streetAddress,
      //                 city:values.city,
      //                 stateProvince:values.stateProvince,
      //                 postalCode:values.postalCode,
      //                 county:values.county,
      //       },
      //       contactInformation:{
      //                 email:values.email,
      //                 mobile:values.mobile,
      //                 twitter:values.twitter,
      //                 instagram:values.instagram,
      //       },
      //       openingHours:values.openingHours,
      //       images:values.images
      //  }
      (values.restaurantId = restaurant.usersRestaurant?.id), 
      dispatch(createMenuItemApi({menu:values,jwt}));
    },
  });
  const handleImageChange = async (e) => {

    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);

    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };
  return (
    <div className="py-10 px-55 lg:flex items-center justify-center min-h-screen">
      <div className="lg:mx-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">Add New Menu</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                multiple
              />

              <label className="relative cursor-pointer" htmlFor="fileInput">
                <span
                  className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 
                border rounded-md border-gray-600"
                >
                  <AddPhotoAlternateIcon className="text-white" />
                </span>
                {uploadImage && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>

              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              ></TextField>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                  name="category"
                >
              { restaurant.categories?.map((item) => <MenuItem value={item}>{item.name}</MenuItem>) }
                  
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">
                  Ingredients
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={formik.values.ingredients}
                  name="ingredients"
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  //   MenuProps={MenuProps}
                >
                  {ingredients.ingredients?.map((item, index) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="seasonal"
                  value={formik.values.seasonal}
                  label="Is Seasonal"
                  onChange={formik.handleChange}
                  name="seasonal"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Vegitarian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="vegitarian"
                  value={formik.values.vegitarian}
                  label="Is Vegitarian"
                  onChange={formik.handleChange}
                  name="vegitarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            

          
           

           


           
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            {" "}
            Create Menu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
