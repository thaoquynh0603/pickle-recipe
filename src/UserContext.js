import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({ email: '', isAuthenticated: false });
    const AIRTABLE_TOKEN='patKuyFaQvM0pJ4AV.c671b89191b773332918e2c1b79f9719d19d3517ec5a2e49d85e9fab2a27a1f1';
    const fetchUserName = async (email) => {
        try {
            const response = await axios.get(`https://api.airtable.com/v0/appIQYAnCAABYkQtE/users?filterByFormula=email+%3D+"${email}"`, {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_TOKEN}`
                }
            });
    
            const userRecord = response.data.records[0];
            const userName = userRecord.fields.Name;
            console.log('User name:', userName);
            setUserData(prevUserData => ({ ...prevUserData, name: userName }));
            
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    // useEffect(() => {
    //     if (userData.email) {
    //         fetchUserName(userData.email);
    //     }
    // }, [userData.email]);

    // console.log('Data Name', userData.name);

    return (
        <UserContext.Provider value={{ userData, setUserData, fetchUserName }}>
            {children}
        </UserContext.Provider>
    );
};