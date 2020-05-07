import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';

//Icons in MaterialTable did not work properly so I found this solution
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as moment from "moment";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



export default function TrainingsUpdated() {

  //Icons in MaterialTable listed here  
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutlineIcon {...props} ref={ref} />),
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

  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => getTrainings(), []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => setTrainings(data))
      .then(err => console.error(err));

  };

  const deleteTraining = id => {
    if (window.confirm("Are you sure you want to delete?")) {
      const link = "https://customerrest.herokuapp.com/api/trainings/" + id;
      fetch(link, { method: "DELETE" })
        .then(_ => getTrainings())
        .then(_ => {
          setMsg("Training deleted")
          setOpen(true)
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div>

    <MaterialTable
      title="Training list"
      options={{
        headerStyle: {
            backgroundColor: '#CD5C5C',
            color: '#FFF'
        },
      }}

      icons={tableIcons}
      data={trainings}
      defaultPageSize={10}

      columns={[
        { title: 'Actions', filed: 'delete',
        render: rowData => <Button onClick={() => deleteTraining(rowData.id)} color="secondary">Delete</Button>
        },        
        { title: 'Activity', field: 'activity' },
        { title: 'Date', field: 'date' },
        { title: 'Duration', field: 'duration'},
        { title: 'Customer', filed: '' /* {row.customer.firstname} {row.customer.lastname} */}
        
      ]}
      data={trainings}  
      />  
      </div>
  );
}




      /*
        //want to display the correct date
        moment(new Date(row.date)).format("YYYY-MM-DD hh:mm:ss")}
 */



      //<DeleteOutlineIcon doesnt work
/*       actions={[
        {
          icon: '',
          tooltip: 'Delete training',
          onClick: rowData => alert("You deleted " + rowData.customer)
        }
      ]} */
   
