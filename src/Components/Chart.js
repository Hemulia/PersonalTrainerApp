import React, {useEffect, useState} from 'react';
import {CartesianGrid, XAxis, YAxis, Bar, BarChart} from 'recharts';
import lodash from 'lodash';
import '../App.css';


export default function Chart() {
   const [trainings, setTrainings] = React.useState([]);
   const [newTrainings, setNewTrainings] = React.useState({
      activity: '',
      totalduration: ''
   });

   useEffect(() => getTrainings(), []);

   const getTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(responseData => setTrainings(responseData))  
   }

   let newData = 
      lodash(trainings)
         .groupBy('activity')
         .map((value, key) => ({
            'activity': key,
            'total': lodash.sumBy(value, 'duration')
         }))
         .value();
         
   console.log(newData);
   

   return (
    <div className='chartdiv'>
    <h1>Statistics</h1>
      <BarChart className="chart"width={930} height={300} data={newData} >
         <CartesianGrid />
         <XAxis dataKey="activity" />
         <YAxis label={{fontColor :'white', value: 'Duration (min)', position: 'insideLeft', angle: 90}}/>
         <Bar dataKey="total" fill="rgb(190, 209, 15)" />
      </BarChart>
      </div>
   );
}