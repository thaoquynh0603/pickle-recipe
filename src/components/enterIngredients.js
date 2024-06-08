import React, { useState, useContext} from 'react';
import './styles/enterIngredients.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { UserContext } from '../UserContext';

function EnterIngredients() {
    const { userData } = useContext(UserContext);

    const [formData, setFormData] = useState({
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
        const submissionData = {
            email: userData.email,
            ...formData
        };
        try {
            // console.log('Email to send', userData.email);
            // console.log('Email record', submissionData.email);
            const response = await axios.post('http://localhost:5000/submit', submissionData);
            console.log(response.data);
            // You can display a success message or handle the response as needed
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    };
  

    return (
        <div>
            {userData.isAuthenticated ? (
                <div>
                    <p className='greeting'>Hello, {userData.name}</p>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            {/* <TextField
                            required
                            className='emailInput'
                            id="email"
                            label="Enter Your Email"
                            value={formData.email}
                            defaultValue={userData.email}
                            onChange={handleChange} // Disable email input
                            style={{ display: 'none' }} // Hide the email input
                        /> */}
                        <div className='Container'>
                            <TextField
                                required
                                className='ingredientInput textField'
                                id="ingredients"
                                label="What ingredients do you have?"
                                multiline
                                rows={5}
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
                ) : (
                <p>Please log in or register.</p>
            )}
        </div>
    );
}

export default EnterIngredients;
