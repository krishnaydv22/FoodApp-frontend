import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientApi, createIngredientCategory, getIngredientCategoryApi, getIngredientsOfRestaurantApi } from "../../Components/State/Ingredients/Action";

const CreateIngredientForm = () => {
  const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurant,ingredients} = useSelector((store) => store);
  
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
     ...formData,
     restaurantId:restaurant.usersRestaurant?.id
    };
    dispatch(createIngredientApi({data,jwt}))
  };

 
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-8">
          Create Ingredient
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>

<div className="mt-5">
           <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ingredient Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.categoryId}
                  label="categoryId"
                  onChange={handleInputChange}
                  name="categoryId"
                >
             {   ingredients.category.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)  
               }                  
                </Select>
              </FormControl>

        </div>


          <div className="mt-5">
            <Button variant="contained" type="submit">
              Create Ingredient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
