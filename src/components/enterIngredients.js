import React, { useState } from 'react';
import './styles/enterIngredients.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function EnterIngredients() {
    const [formData, setFormData] = useState({
        email: '',
        ingredients: '',
        times: '',
        difficulty: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/submit', formData);
            console.log(response.data);
            // You can display a success message or handle the response as needed
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    };

    return (
        <div className='sideBar'>
            <h1>PICKLE RECIPE</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    required
                    className='emailInput'
                    id="email"
                    label="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <div className='Container'>
                    <TextField
                        required
                        className='ingredientInput'
                        id="ingredients"
                        label="What ingredients do you have?"
                        multiline
                        rows={15}
                        variant="standard"
                        value={formData.ingredients}
                        onChange={handleChange}
                    />
                </div>
                <Box className='instructionContainer'>
                    <TextField
                        className='instructionInput timeInput'
                        id="times"
                        label="Times"
                        value={formData.times}
                        onChange={handleChange}
                    />
                    <TextField
                        className='instructionInput difficultyInput'
                        id="difficulty"
                        label="Difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    />
                </Box>
                <Button 
                    variant="contained"
                    className='inputButton'
                    type="submit"
                >
                    START COOKING!!!
                </Button>
            </form>
        </div>
    );
}

export default EnterIngredients;
