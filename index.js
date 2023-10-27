const express = require('express');
const app = express();
const printRoute = require('./Routes/printRoutes');


const PORT = 3000;

app.use('/', printRoute);

app.listen(PORT, () => {
    console.log('app is running on port: ' + PORT);
});

