const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3001;

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

app.post('/signup', (req, res) => {
    console.log(req.body);

    res.json({
        message: 'POST request received successfully.'
    })
});