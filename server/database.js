const {Client} = require('pg');

const client = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "postgres"
});

client.connect();
module.exports = client;