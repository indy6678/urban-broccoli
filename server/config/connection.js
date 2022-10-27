const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urban-broccoli', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // use the below with v5.9.9 or lower
    // useCreateIndex: true,
    // useFindAndModify: false
});

module.exports = mongoose.connection;