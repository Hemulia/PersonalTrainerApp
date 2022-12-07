import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import '../App.css';




export default function TrainingCal() {
   const [trainings, setTrainings] = useState([]);
   const localizer = momentLocalizer(moment);

   useEffect(() => getTrainings(), []);

   const getTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then((responseData) => {
         let trainingArray = []
         for (let i = 0; i < responseData.length; i++) {
            trainingArray.push({
               title: responseData[i].activity + " / " + responseData[i].customer.firstname + " " + responseData[i].customer.lastname,
               start: new Date(responseData[i].date),
               end: moment(responseData[i].date).add(responseData[i].duration, "min").toDate()
            })
            setTrainings(trainingArray)
         }
      })
      .catch(err => console.error(err))
   }


   
   return(
      <div style={{ height: "600px"}}>
        <Calendar
            className='cal'
            localizer={localizer}
            events={trainings}
            step={60}
            defaultView={"month"}
        />
      </div>
   );
}