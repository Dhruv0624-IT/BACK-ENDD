    require('dotenv').config();
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const booksRouter = require('./routes/books');

    const app = express();
    app.use(cors());
    app.use(express.json());

    const PORT = process.env.PORT || 5000;

    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    app.use('/api/books', booksRouter);

    app.get('/', (req, res) => res.send('Bookstore API'));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
