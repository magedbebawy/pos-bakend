const express = require('express');
const app = express();
const printRoute = require('./Routes/printRoutes');
const userRoutes = require('./Routes/userRoutes');

const PORT = 3000;

app.use(express.json());
app.use('/', printRoute);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log('app is running on port: ' + PORT);
});

