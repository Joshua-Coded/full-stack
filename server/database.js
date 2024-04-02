const mongoose = require('mongoose');

const dbConnection = process.env.DB_CONNECTION;

mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
