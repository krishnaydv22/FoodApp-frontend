import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryApi } from "../../Components/State/Restaurant/Action";

const CreateFoodCategoryForm = () => {
  const {restaurant} = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
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
      name: formData.categoryName,
      restaurantId: {
        id: restaurant.usersRestaurant?.id,
      },
    };
    dispatch(createCategoryApi({reqData:data,jwt}))
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-8">
          Create Food Category
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Category Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
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

export default CreateFoodCategoryForm;
