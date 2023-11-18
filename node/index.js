const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const create_table = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key (id))`
const insert_query = `INSERT INTO people(name) values('Rafael')`

connection.query(create_table)
connection.query(insert_query)
connection.end()

console.log('Running')

app.get('/', (req,res) => {
    console.log('Inside GET /')
    var html = '<h1>Full Cycle</h1>'

    const connection = mysql.createConnection(config)
    connection.query('SELECT name FROM people', (err, rows) => {
        if(err) throw err
        html += '<br/><h2>List of names:</h2><ul>'
        rows.forEach( (row) => {
            html += `<li>${row.name}</li>`
        })
        html += '</ul>'
        res.send(html)
    })
    connection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})