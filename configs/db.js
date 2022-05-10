const mongoose = require('mongoose');

const connect = async () => {
    try {
        return mongoose.connect("mongodb://127.0.0.1:27017/pagination");
    } catch (error) {
        console.log({error : error.message});
    };
};


module.exports = connect;
