import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import 'react-table-v6/react-table.css';
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

    //Icons listed here and everyhing working fine
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
    const [state, setState] = useState();

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers/')
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }


            const columns = [
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
        
                },
            ]
    


    
    return (
        <div>
            <MaterialTable className="-striped -highlight"
            title="Customer Database"
            options={{
                headerStyle: {
                    backgroundColor: '#CD5C5C',
                    color: '#FFF'
                },
                filtering: true
            }}
            editable={{
                onRowAdd: newData =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        const data = props.data;
                        customer.push(newData);
                        setState({ data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        const data = props.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        setState({ data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        let data = customer;
                        const index = data.indexOf(oldData);
                        data.splice(index, 1);
                        setState({ data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
              }}
            sorting={true}
            icons={tableIcons}
            data={customer}
            columns={columns}
            defaultPageSize={10} 
            />

        </div>
    )
}