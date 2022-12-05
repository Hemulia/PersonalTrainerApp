import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import '../Customer.css';



export default function AddCustomer(props) {
   const [open, setOpen] = React.useState(false);
   const [customer, setCustomer] = React.useState({
      firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
   });

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleInputChange = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value })
   }

   const addCustomer = () => {
      props.saveCustomer(customer);
      swal("Good job!", "A new customer has been saved!", "success");
      handleClose();
   }

  
  
  
   return(
      <div>
         <button className='button' style={{margin: '10px'}} variant="outlined" onClick={handleClickOpen}>
            Add Customer
         </button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent>
               <TextField
                  autoFocus
                  margin="dense"
                  name="firstname"
                  value={customer.firstname}
                  onChange={e => handleInputChange(e)}
                  label="Firstname"
                  fullWidth
                  variant="standard"
                  />
               <TextField
                  margin="dense"
                  name="lastname"
                  value={customer.lastname}
                  onChange={e => handleInputChange(e)}
                  label="Lastname"
                  fullWidth
                  variant="standard"
                  />
               <TextField
                  margin="dense"
                  name="streetaddress"
                  value={customer.streetaddress}
                  onChange={e => handleInputChange(e)}
                  label="Street address"
                  fullWidth
                  variant="standard"
                  />  
               <TextField
                  margin="dense"
                  name="postcode"
                  value={customer.postcode}
                  onChange={e => handleInputChange(e)}
                  label="Postcode"
                  fullWidth
                  variant="standard"
                  />
               <TextField
                  margin="dense"
                  name="city"
                  value={customer.city}
                  onChange={e => handleInputChange(e)}
                  label="City"
                  fullWidth
                  variant="standard"
                  />
               <TextField
                  margin="dense"
                  name="email"
                  value={customer.email}
                  onChange={e => handleInputChange(e)}
                  label="Email"
                  fullWidth
                  variant="standard"
                  />
               <TextField
                  margin="dense"
                  name="phone"
                  value={customer.phone}
                  onChange={e => handleInputChange(e)}
                  label="Phone"
                  fullWidth
                  variant="standard"
                  />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={addCustomer}>Save</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}