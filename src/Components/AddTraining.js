import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { BsPlusLg } from "react-icons/bs";
import '../App.css';





export default function AddTraining(props) {
   const [newDate, handleNewDate] = useState(new Date());
   const [open, setOpen] = React.useState(false);
   const [training, setTraining] = React.useState({
      date: "", duration: "", activity: "", customer: props.customerId 
   })

   const handleClickOpen = () => {
      setOpen(true);
   }

   const handleClose = () => {
      setOpen(false);
   };

   const handleSave = () => {
      props.addTraining(training);
      setOpen(false);
   }

   const handleInputChange = (event) => {
      setTraining({...training, [event.target.name]: event.target.value});
   }
 
   const approveDate = (date) => {
      handleNewDate(date);
      setTraining({...training, date: date});
   }

   return(
      <div>
         <button style={{margin: '10px'}} className="plus" variant="outlined" onClick={handleClickOpen}>
            <BsPlusLg color="green" size={18} />
         </button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle >New Training</DialogTitle>
            <DialogContent>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                     renderInput={(props) => <TextField {...props} />}
                     value={newDate}
                     variant="standard"
                     margin="dense"
                     onChange={date => approveDate(date)}/>
                  </LocalizationProvider>
               <TextField
                  margin="dense"
                  name="duration"
                  value={training.duration}
                  onChange={handleInputChange}
                  label="Duration"
                  fullWidth
                  variant="standard"
               />
               <TextField
                  margin="dense"
                  name="activity"
                  value={training.activity}
                  onChange={handleInputChange}
                  label="Activity"
                  fullWidth
                  variant="standard"
               />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} style={{color:"red"}} >Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
         </DialogActions>
      </Dialog>
   </div>
   );
}