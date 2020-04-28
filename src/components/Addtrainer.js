import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

//Add Training is a component that enables function of adding a new training

export default function AddTraining(props) {
    const [training, setTraining] = React.useState({
        activity: "",
        date: "",
        duration: "",
        customer: props.link
    });
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        addTraining(training);
        setOpen(false);
    };

    const inputChanged = event => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    const addTraining = training => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(training)
        })
            .then(_ => {
                setMsg("New training added");

            })
            .catch(err => console.error(err))
    };

    return (
        <div>

        </div>
    );
}