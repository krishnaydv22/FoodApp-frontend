import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createIngredientCategory } from "../../Components/State/Ingredients/Action";
import { useDispatch, useSelector } from "react-redux";

const CreateIngredientCategoryForm = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant} = useSelector((store) => store);

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const data = {name:formData.name,restaurantId:restaurant.usersRestaurant?.id}
    e.preventDefault();
      dispatch(createIngredientCategory({data,jwt}))
    
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-8">
        Create Ingredient Category
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Category"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>
          <div className="mt-5">
            <Button variant="contained" type="submit">
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
