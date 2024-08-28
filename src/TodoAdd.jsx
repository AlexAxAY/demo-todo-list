import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Create from '@mui/icons-material/Create';
import { ListItem } from '@mui/material';




export default function TodoAdd({ add }) {
    const [change, setChange] = useState("");

    const onChange = (evt) => {
        setChange(evt.target.value);
    };

    const handleEvent = function (evt) {
        evt.preventDefault();
        add(change);
        setChange("");
    }


    return (
        <ListItem>
            <form onSubmit={handleEvent}>
                <TextField
                    id="filled-basic"
                    label="Add your task"
                    variant="filled"
                    onChange={onChange}
                    value={change}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="add task" edge="end" type="submit">
                                    <Create />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                /></form>
        </ListItem>
    );
}





