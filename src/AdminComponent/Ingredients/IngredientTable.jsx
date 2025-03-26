import { Box, Button, Card, CardHeader, IconButton, Modal } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import CreateIngredientForm from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurantApi, updateStockOfIngredientApi } from '../../Components/State/Ingredients/Action';

const orders = [1,1,1,1,1]

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



const IngredientTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
      const jwt = localStorage.getItem("jwt");
      const {restaurant,ingredients} = useSelector((store) => store);

      useEffect(() =>{
        dispatch(getIngredientsOfRestaurantApi({jwt,id:restaurant.usersRestaurant?.id}))
      },[])

      const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredientApi({id,jwt}))
      }

  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader action={
              <IconButton onClick={handleOpen} aria-label='settings'>
                   <CreateIcon />
              </IconButton>
            }
            title={"Ingredients"}
            sx={{pt:2,alignItems:"center"}}
            />
        

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>
             <TableCell align="right">Availability</TableCell>
         </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.ingredients.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>

              <TableCell align="right">{item.category.name}</TableCell>
              <TableCell align="right"><Button onClick={() => handleUpdateStock(item.id)}>{item.inStock?"in_Stock":"out_Of_Stock"}</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>

    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <CreateIngredientForm />
  
  </Box>
</Modal>
    </Box>
  )
}

export default IngredientTable
