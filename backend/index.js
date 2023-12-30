const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');


const app = express();
const port = 3001;

let users = [];

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Listening to requests from port ${port}`);
});

app.get('/', (req, res) => {
    console.log('A request was received from React.');
    res.json({
        response: 'response data'
    });
});

app.post('/signup', async (req, res) => {
    const { name, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name: name,
        email: email,
        username: username,
        password: hashedPassword
    }
    users.push(newUser);
    console.log(users);

    res.json({
        message: 'POST request received successfully.'
    })
});