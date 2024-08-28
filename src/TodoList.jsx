import { useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import TodoSingleItem from './TodoSingleItem';
import TodoAdd from './TodoAdd';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';



const fetchTodo = async function () {
    try {
        const response = await axios.get('/api/todo');
        console.log("fetched data", response.data);
        return response.data
    }
    catch (error) {
        console.log("Error in fetching data", error)
        throw error
    }
}



export default function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const loadData = async function () {
            try {
                const data = await fetchTodo();
                setTodos(data);
            } catch (error) {
                console.log("Failed to load the data!", error);
                throw error;
            }
        };
        loadData();
    }, []);

    const addOne = async function (text) {
        try {
            const response = await axios.post('/api/todos/', { text });
            setTodos([...todos, response.data]);
        } catch (error) {
            console.log("Trouble in adding task!", error);
            throw error;
        }
    };

    const removeItem = async function (i) {
        try {
            await axios.delete(`/api/todos/${i}`);
            setTodos((currItem) => {
                return currItem.filter(f => f.id !== i);
            })
        } catch (error) {
            console.log("Error in deleting item", error);
            throw error;
        }
    }

    const toggle = async function (i) {
        try {
            const updatedTodo = todos.find(t => i === t.id);
            const response = await axios.put(`/api/todos/${i}`, { finished: !updatedTodo.finished });
            setTodos((currItem) => {
                return currItem.map(m => (m.id === i ? response.data : m));
            });
        } catch (error) {
            console.log("Error in updating", error);
        }

    }




    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            m: 3
        }}>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map(function (todo) {
                    return <TodoSingleItem todo={todo}
                        key={todo.id}
                        remove={() => removeItem(todo.id)}
                        toggle={() => toggle(todo.id)}
                    />

                })}
                <TodoAdd add={addOne} />
            </List>
        </Box>

    )
}



