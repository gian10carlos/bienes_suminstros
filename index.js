const express = require('express');
const app = express();
const path = require('path')
const router = require('./route')

const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})