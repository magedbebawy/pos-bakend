const express = require('express');
const app = express();
const printRoute = require('./Routes/printRoutes');
const userRoutes = require('./Routes/userRoutes');
const storeRoutes = require('./Routes/storeRoutes');
const pool = require('./db/db');
const cors = require('cors');


const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/', printRoute);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);

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

