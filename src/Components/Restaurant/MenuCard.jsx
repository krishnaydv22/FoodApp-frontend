import { Accordion, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'
import { categrizeIngredients } from '../../utils/categrizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCartApi } from '../State/Cart/Action';



const demo = [
    {
        category : "Nuts & seeds",
        ingredients :["Cashews"]
    },
    {
        category : "Protein",
        ingredients :["Ground beef","Bacon strips"]
    }

]

const MenuCard = ({item}) => {

const [selectedIngredients,setSelectedIngredients] = useState([]);
const dispatch = useDispatch();

const handleCheckBoxChange = (itemName) =>{
    if(selectedIngredients.includes(itemName)){
        setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName))
    }
    else{
        setSelectedIngredients([...selectedIngredients,itemName]);
    }
}

const handleAddItemToCard = (e) => {
    e.preventDefault();
    const reqData = {
        jwt : localStorage.getItem("jwt"),
        cartItem:{
            foodId:item.id,
           
            ingredients:selectedIngredients,
            quantity:1,
        }
    }

    dispatch(addItemToCartApi(reqData));

    

}

  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
         <div className='lg:flex items-center justify-between'>
            <div className='lg:flex items-center lg:gap-5'>
                <img className='w-[7rem] h-[7rem] object-cover' src={item.images[0]} alt=""/>

                <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                    <p className='font-semibold text-xl'>{item.name}</p>
                    <p>₹ {item.price}</p>
                    <p className='text-gray-400'>{item.description}</p>

                </div>
            </div>

         </div>
        </AccordionSummary>
        <AccordionDetails>
            <form onSubmit={handleAddItemToCard}>
                <div className='flex gap-5 flex-wrap'>
                    {
                        Object.keys(categrizeIngredients(item.ingredients)).map((category) => (
                            
                        <div  className="">
                            <p>{category}</p>
                        <FormGroup>
                  { categrizeIngredients(item.ingredients)[category].map((item) => (
                    <FormControlLabel 
                    key={item.id} 
                    control={<Checkbox  
                    onChange={() => handleCheckBoxChange(item.name)}/>}
                    label={item.name} />

                  ))      }
                       
                      </FormGroup>
                      </div>

                      ))}
                    </div>
                    <div className='pt-5'>
                    <Button 
                    type="submit" variant='contained' disabled={false}>{true?"Add to Cart" : "Out Of Stock"}</Button>
                    </div>
            </form>
         
          
         
        </AccordionDetails>
      </Accordion>
  )
}

export default MenuCard
