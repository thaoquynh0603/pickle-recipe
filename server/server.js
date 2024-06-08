const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const Airtable = require('airtable');
const app = express();
const PORT = 5000;
const base = require('airtable').base('appIQYAnCAABYkQtE');

app.use(cors());
app.use(bodyParser.json());

app.post('/check-email', (req, res) => {
    const { email } = req.body;

    base('Users').select({
        filterByFormula: `{Email} = '${email}'`
    }).firstPage((err, records) => {
        if (err) {
            console.error('Error querying Airtable:', err);
            return res.status(500).json({ message: 'Error querying Airtable', error: err });
        }

        if (records.length > 0) {
            res.json({ exists: true, recordId: records[0].id });
        } else {
            res.json({ exists: false });
        }
    });
});

// Endpoint to handle login
app.post('/login', (req, res) => {
    const { recordId, password } = req.body;

    base("Users").find(recordId, (err, record) => {
        if (err) {
            console.error('Error fetching record:', err);
            return res.status(500).json({ message: 'Error fetching record', error: err });
        }

        if (record.fields.Password === password) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    });
});

// Endpoint to handle registration
app.post('/register', (req, res) => {
    const { email, password, name, note } = req.body;

    base("Users").create([
        {
            fields: {
                Email: email,
                Password: password,
                Name: name,
                Notes: note
            }
        }
    ], (err, records) => {
        if (err) {
            console.error('Error creating record:', err);
            return res.status(500).json({ message: 'Error creating record', error: err });
        }

        res.json({ message: 'Registration successful', recordId: records[0].id });
    });
});


app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);
    base('requests').create([
        {
            fields: {
                Email: formData.email,
                Ingredients: formData.ingredients,
                Time: formData.times,
                Difficulty: formData.difficulty
            }
        }
    ], (err, records) => {
        if (err) {
            console.error('Error adding to Airtable:', err);
            return res.status(500).json({ message: 'Error adding to Airtable', error: err });
        }
        console.log('Airtable records:', records);
        const formDataStr = JSON.stringify(formData);
        const pythonProcess = spawn('python3', ['server/send_email.py', formDataStr]);
        pythonProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            res.json({ message: 'Form data received successfully and email sent', data: formData });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});