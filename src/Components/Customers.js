import React, { useState, useEffect,  useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../App.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining'
import { RiDeleteBinLine } from "react-icons/ri";
import swal from 'sweetalert';
import '../Customer.css';


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

   const delCustomer = (link) => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this customer!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
       })
       .then((willDelete) => {
         if (willDelete) {
           swal("Customer has been deleted", {
             icon: "success",
           });
           fetch(link, {method: 'DELETE'})
           .then(res => fetchCustomers())
           .catch(err => console.error(err))
         } else {
           swal("Customer has not been deleted!");
         }
       });
   }

   const saveCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(customer)
      }) 
      .then(res => fetchCustomers())
      .catch(err => console.error(err))
   }

   const editCustomer = (link, customer) => {
      fetch(link, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(customer)
      })
      .then(res => fetchCustomers())
      .catch(err => console.error(err))
   }

   const addTraining = (training) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(training)
      })
      .then(res => fetchCustomers())
      .catch(err => console.error(err))
   }

   const onExportClick = useCallback(() => {
      gridRef.current.api.exportDataAsCsv();
   }, []); 
      
   


   const columns = [
    {field: 'firstname', headerName:'First Name', sortable: true, filter: true,width:160 },
    {field: 'lastname', headerName:'Last Name', sortable: true, filter: true,width:160},
    {field: 'streetaddress', headerName:'Street Adress', sortable: true, filter: true},
    {field: 'postcode', headerName:'Postcode', sortable: true, filter: true, width:130},
    {field: 'city', headerName:'City', sortable: true, filter: true},
    {field: 'email', headerName:'Email', sortable: true, filter: true},
    {field: 'phone', headerName:'Phone', sortable: true, filter: true},
    {headerName: '', field: 'links.0.href', width: 60, 
    cellRendererFramework: params =>  
    <AddTraining link={params.value} training={params.data} addTraining={addTraining} customerId={params.value}/>},
    {headerName: '', field: 'links.0.href', width: 60,
    cellRendererFramework: params => 
    <button style={{margin: '10px'}} variant="outlined" className='del' onClick={() => delCustomer(params.value)}>
       <RiDeleteBinLine color="red" size={19}/>
   </button>
    },
    {headerName: '', field: 'links.0.href', width: 70,
    cellRendererFramework: params => 
    <EditCustomer link={params.value} customer={params.data} editCustomer={editCustomer}/>
    }

   ]
   return(
      <div className="ag-theme-material" alt="custom">
         <button><AddCustomer saveCustomer={saveCustomer}/></button>
         <button className='button' style={{margin: '10px'}} variant="outlined" onClick={onExportClick}>
            Export
         </button>
         <AgGridReact
            className='ag'
            centered
            ref={gridRef}
            rowSelection='single'      
            columnDefs={columns}
            rowData={customers}>
         </AgGridReact>
      </div>
   );
}