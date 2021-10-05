const express = require("express");
const Message = require("../models/messageModel");


const router = new express.Router();
// 

router.post("/messages", async (req, res) => {

    const message = new Message(req.body)

    try {
        await message.save();
        return res.status(201).send(message)
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.get("/messages", async (req, res) => {
    try {
        console.log("Fire");
        const messages = await Message.find({})

        if (messages.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "None messages matches"
            })
        }
        res.send(messages);
    } catch (err) {
        res.status(500).send(err.message)
    }
})


router.delete("/messages/:id", async (req, res) => {
    const messageId = req.params.id;

    try {
        const message = await Ad.findOneAndDelete({ _id: messageId });
        if (message == null) {
            return res.status(404).send({
                status: 404,
                message: "Ad not found."
            })
        }

        res.send(message)
    } catch (err) {
        res.status(500).send()
    }
})

router.patch("/messages/:id", async (req, res) => {
    const allowedUpdates = ["content"]
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => { return allowedUpdates.includes(update) })
    if (!isValidOperation) {
        return res.status(400).send({
            status: 400,
            message: "Invalid update key."
        })
    }
    const _id = req.params.id;
    const reqObj = req.body;
    try {
        const message = await Message.findOne({ _id })
        if (message == null) {
            return res.status(404).send({
                status: 404,
                message: "Message not found"
            })
        }
        updates.forEach((update) => { ad[update] = reqObj[update] })
        await message.save()
        res.send(message);
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Invalid update value."
        })
    }
})


module.exports = router;