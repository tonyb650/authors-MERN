const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [ true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters long"]
    },
    lastName: {type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters long"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Author', authorSchema)