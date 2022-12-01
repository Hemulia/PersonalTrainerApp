import React, { useState, useEffect,  useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../App.css';

export default function Customers() {
   const [customers, setCustomers] = useState([]);
   const gridRef = useRef();
   useEffect(() => fetchCustomers(), []);

   const fetchCustomers = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
   }


   const columns = [

      {field: 'firstname', headerName:'First Name', sortable: true, filter: true, },
      {field: 'lastname', headerName:'Last Name', sortable: true, filter: true},
      {field: 'streetaddress', headerName:'Street Adress', sortable: true, filter: true},
      {field: 'postcode', headerName:'Postal Code', sortable: true, filter: true},
      {field: 'city', headerName:'City', sortable: true, filter: true},
      {field: 'email', headerName:'Email', sortable: true, filter: true},
      {field: 'phone', headerName:'Phone', sortable: true, filter: true},

   ]
   return(
      <div className="ag-theme-alpine" style={{height: '1100px', width: '100%', marginTop:'20px',marginLeft: 'auto', marginRight:'auto'}}>
         <AgGridReact
            centered
            ref={gridRef}
            rowSelection='single'      
            columnDefs={columns}
            rowData={customers}>
         </AgGridReact>
      </div>
   );
}