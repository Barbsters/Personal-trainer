import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';

//Icons in MaterialTable did not work properly so I found this solution
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



export default function Customerlist(props) {

    //Icons in MaterialTable listed here  
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    
    const [customer, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
  


    const handleClose = () => {
      setOpen(false);
    }

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {

        fetch(link, {
            method: 'DELETE'}) 
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer deleted');
            setOpen(true);
        })
        .catch(err => console.error(err))
        }     
    

    const addCustomer = (customer) => {
      console.log(customer)
      fetch('https://customerrest.herokuapp.com/api/customers',
      { 
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(customer)
      }
      )
      .then(_ => getCustomers())
      .then(_ => {
        setMsg('New customer added');
        setOpen(true);
      })
      .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
      fetch(link,
      {
       method: 'PUT',
       headers: { 'Content-Type':'application/json'},
       body: JSON.stringify(customer)
      })
      .then(_ => getCustomers())
      .then(_ => {
          setMsg('Customer information upadated');
          setOpen(true);
      })
      .catch(err => console.error(err))
  }

  return ( 
    <div>
            <MaterialTable className="-striped -highlight"
            title="Customer List"
            options={{
                headerStyle: {
                    backgroundColor: '#CD5C5C',
                    color: '#FFF'
                },
            }}
            
            icons={tableIcons}
            data={customer}
            defaultPageSize={10} 
  
            columns = {[
               {
                title: 'Add training', 
                field: 'add',
                filtering: false,
                render: rowData => <Button color="secondary">Add training</Button>
               /*  render: rowData => <AddTraining link={rowData.links[0].href}  />  // renders straight in table*/
              },  
              {
                  title: 'First Name',
                  field: 'firstname'
              },
              {
                  title: 'Last Name',
                  field: 'lastname'
              },
              {
                  title: 'Street Address',
                  field: 'streetaddress'
              },
              {
                  title: 'Post Code',
                  field: 'postcode',
                  type: 'numeric'
              },
              {
                  title: 'City',
                  field: 'city' 
              },
              {
                  title: 'Email',
                  field: 'email',
      
              },
              {
                  title: 'Mobile Number',
                  field: 'phone',
                  type:'numeric',
      
              }               
            ]}
          

            editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                      const customer = {
                        firstname: newData.firstname,
                        lastname: newData.lastname,
                        streetaddress: newData.streetaddress,
                        postcode: newData.postcode,
                        city: newData.city,
                        email: newData.email,
                        phone: newData.phone,            
                      };
                      addCustomer(customer);
                      handleClose();
                      resolve();
                }),

                onRowUpdate: (newData) =>
                  new Promise((resolve) => {
                    const customer = {
                      firstname: newData.firstname,
                      lastname: newData.lastname,
                      streetaddress: newData.streetaddress,
                      postcode: newData.postcode,
                      city: newData.city,
                      email: newData.email,
                      phone: newData.phone,            
                    };
                    const link = newData.links[0].href;
                      updateCustomer(link, customer);
                      resolve();
                  }),

                  onRowDelete: (link) =>
                  new Promise((resolve) => {
                      deleteCustomer(link.links[0].href);
                      resolve();
                  })

            }}
         />
  

        </div>
    );
}