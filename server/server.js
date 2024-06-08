const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const Airtable = require('airtable');
const app = express();
const PORT = 5000;
const airtableBase = require('airtable').base('appIQYAnCAABYkQtE');

app.use(cors());
app.use(bodyParser.json());


app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);
    airtableBase('requests').create([
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