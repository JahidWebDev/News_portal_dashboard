const express = require('express')
const app = express()
const dotenv = require('dotenv')
const db_connect = require('./utils/db')
dotenv.config()
db_connect();


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
