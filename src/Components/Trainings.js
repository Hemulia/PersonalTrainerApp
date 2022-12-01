import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../App.css';

export default function Trainings() {
   const gridRef = useRef();
   const [trainings, setTrainings] = useState([]);

   useEffect(() => fetchTrainings(), []);
   
   const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
   }

   const columns = [

      {headerName:'', field: 'id', width: 130, sortable: true, filter: true},
      {field: 'date', sortable: true, filter: true, cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleDateString() : '';
   }},
      {field: 'duration', sortable: true, filter: true},
      {field: 'activity', sortable: true, filter: true},
      {headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true},
      {headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true},

   ]

   return(
      <div className="ag-theme-alpine" style={{height: '1100px', width: '100%', marginTop:'20px', marginLeft: 'auto', marginRight:'auto'}}>
      <AgGridReact
         centered
         ref={gridRef}
         rowSelection='single'
         columnDefs={columns}
         rowData={trainings}>
      </AgGridReact>
   </div>
   );
}