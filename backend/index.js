const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.listen(port, () => {
    console.log(`Listening to requests from port ${port}`);
});

app.get('/', (req, res) => {
    console.log('A request is received from React.');
    res.json({
        response: 'response data'
    });
});