import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

  useEffect(() => {
    getTrainings();

  }, []);

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


  const handleClose = () => {
    setOpen(false);
  };

  return (

    <TableContainer  className="trainings">
      <div className="trainings">

        <Table className={classes.table} size="small" aria-label="a dense table" >

          <TableHead>
            <TableRow>
              <TableCell>Trainings</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainings.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.activity}
                </TableCell>
                <TableCell align="right"> {moment(new Date(row.date)).format("YYYY-MM-DD hh:mm:ss")}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right">
                  {row.customer.firstname} {row.customer.lastname}
                </TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete" onClick={() => deleteTraining(row.id)} className={classes.margin}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>

  );
}