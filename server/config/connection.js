const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urban-broccoli', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreatIndex: true,
    useFindAndModify: false
});

module.exports = mongoose.connection;