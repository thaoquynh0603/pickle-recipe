import React, { useContext, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { UserContext } from '../UserContext';

function UserAuthentication() {
    const { userData, setUserData, fetchUserName} = useContext(UserContext);

    const handlePasswordChange = (e) => {
        setUserData({ ...userData, password: e.target.value });
    };

    const handleNameChange = (e) => {
        setUserData({ ...userData, name: e.target.value });
    };

    const handleNoteChange = (e) => {
        setUserData({ ...userData, note: e.target.value });
    };

    const handleCheckEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/check-email', { email: userData.email });
            if (response.data.exists) {
                setUserData({ ...userData, recordId: response.data.recordId, showPasswordInput: true });
            } else {
                setUserData({ ...userData, showRegisterForm: true });
            }
        
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    useEffect(() => {
        // Example of fetching the user name if the email is already set
        if (userData.email) {
            fetchUserName(userData.email);
        }
    }, [userData.email, fetchUserName]);
    
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { recordId: userData.recordId, password: userData.password });
            setUserData({ ...userData, isAuthenticated: true });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
            console.error('Error logging in:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', { email: userData.email, password: userData.password, name: userData.name, note: userData.note });
            setUserData({ ...userData, isAuthenticated: true });
            alert(response.data.message);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div>
            {!userData.showPasswordInput && !userData.showRegisterForm ? (
                <div className='divMargin'>
                    <TextField
                        required
                        className='textField'
                        id="email"
                        label="Enter Your Email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    <Button 
                        variant="contained"
                        className='checkEmailButton'
                        onClick={handleCheckEmail}
                    >
                        Continue
                    </Button>
                </div>
            ) : userData.showPasswordInput ? (
                <div>
                    <TextField
                        required
                        className='textField'
                        id="emailNew"
                        label="Enter Your Email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    <TextField
                        required
                        className='passwordInput textField'
                        id="password"
                        label="Enter Your Password"
                        type="password"
                        value={userData.password}
                        onChange={handlePasswordChange}
                    />
                    <Button 
                        variant="contained"
                        className='loginButton'
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>
            ) : (
                <div>
                    <TextField
                        required
                        className='textField'
                        id="email"
                        label="Enter Your Email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    <TextField
                        required
                        className='passwordInput textField'
                        id="password"
                        label="Enter Your Password"
                        type="password"
                        value={userData.password}
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        required
                        className='nameInput textField'
                        id="name"
                        label="What's your name?"
                        value={userData.name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        required
                        id="note"
                        className='noteInput textField'
                        label="Any notes about your food!"
                        value={userData.note}
                        onChange={handleNoteChange}
                    />
                    <Button 
                        variant="contained"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                </div>
            )}
        </div>
    );
}

export default UserAuthentication;

