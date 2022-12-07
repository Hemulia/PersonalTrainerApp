import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../App.css';
import swal from 'sweetalert';
import { RiDeleteBinLine } from "react-icons/ri";

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

   const delTraining = (value) => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this training session!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
       })
       .then((willDelete) => {
         if (willDelete) {
           swal("Training session has been deleted", {
             icon: "success",
           });
           fetch('https://customerrest.herokuapp.com/api/trainings/' + value, {method: 'DELETE'})
           .then(response => fetchTrainings())
           .catch(err => console.error(err))
           console.log(value);
         } else {
           swal("Training session has not been deleted!");
         }
       });
   }

   const onExportClick = useCallback(() => {
      gridRef.current.api.exportDataAsCsv();
   }, []);

   const columns = [

      {headerName:'', field: 'id', sortable: true, filter: true, maxWidth: 90},
      {field: 'date', sortable: true, filter: true, cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleDateString() : '';
   }},
      {field: 'duration', sortable: true, filter: true, width: 110},
      {field: 'activity', sortable: true, filter: true},
      {headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true},
      {headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true},
      {headerName: '', field: 'id', maxWidth: 60, sortable: true, filter: true, cellRenderer: params => 
      <button style={{margin: '10px'}} variant="outlined" className='del' onClick={() => delTraining(params.value)}>
       <RiDeleteBinLine color="red" size={19}/>
      </button>},


   ]

   return(
      <div className="ag-theme-alpine" style={{height: '1300px'}}>

         <button className='button'  style={{margin: '10px'}} variant="outlined" onClick={onExportClick}>
            Export
         </button>
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