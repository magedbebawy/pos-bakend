const express = require('express');
const app = express();
const printRoute = require('./Routes/printRoutes');
const userRoutes = require('./Routes/userRoutes');
const pool = require('./db/db');

const PORT = 3000;

app.use(express.json());
app.use('/', printRoute);
app.use('/user', userRoutes);

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing PG pool');
    pool.end(() => {
        console.log('Pool has ended');
        process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log('app is running on port: ' + PORT);
});

