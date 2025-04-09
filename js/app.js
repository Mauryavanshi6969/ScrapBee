// app.js

const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/signup', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const userData = { phoneNumber };

    // Save to Excel file
    saveToExcel(userData);

    res.send('Signup successful!');
});

function saveToExcel(userData) {
    const fileName = 'data/userData.xlsx';
    let workbook;

    try {
        workbook = xlsx.readFile(fileName);
    } catch (err) {
        workbook = { Sheets: {}, SheetNames: [] };
    }

    const sheetName = 'users';
    const worksheet = workbook.Sheets[sheetName] || xlsx.utils.json_to_sheet([]);

    xlsx.utils.sheet_add_json(worksheet, [userData], { header: ['phoneNumber'], skipHeader: true });
    workbook.Sheets[sheetName] = worksheet;
    workbook.SheetNames.push(sheetName);

    xlsx.writeFile(workbook, fileName);
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
