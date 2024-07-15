const { createPool } = require('mysql2');

const connection = createPool({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'bienes_servicios'
});

connection.getConnection((err) => {
    if (err) return console.log('Error connection database');
    console.log('Connection successful database')
})

module.exports = connection;