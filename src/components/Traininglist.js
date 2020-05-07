import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as moment from "moment";
import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function TrainingsUpdated() {
  const classes = useStyles();
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
    if (window.confirm("Are you sure?")) {
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

    <TableContainer  >
      <div >

        <Table className={classes.table} >

          <TableHead>
            <TableRow>

              <TableCell></TableCell>
              <TableCell>Trainings</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Customer</TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
            {trainings.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => deleteTraining(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{row.activity}</TableCell>
                <TableCell> {moment(new Date(row.date)).format("YYYY-MM-DD hh:mm:ss")}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.id}</TableCell>
                

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>

  );
}