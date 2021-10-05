const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        validate(value) {
            if (value === "") {
                throw new Error("Message content cannot be empty.")
            }
        }
    }

}, {
    timestamps: true
});


const Message = mongoose.model("message", messageSchema)

module.exports = Message;

