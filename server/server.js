const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const axios = require('axios');
const queries = require('./database/index.js')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'client/public')))
app.use(bodyparser.json())
app.use(
    bodyparser.urlencoded({
        extended:true,
    })
)

app.get('/create', (req, res) => {

})



app.listen(port, () => {
    console.log(`You are listening on port${port}`)
});