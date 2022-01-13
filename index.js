var express = require('express');
const app = express();
require('dotenv').config();

var FCM = require('fcm-node');
const mongoose = require('mongoose');
var serverKey = process.env.FCM_SERVER_KEY;
var fcm = new FCM(serverKey);
var { getDatabase } = require('./database.config');
var { Message } = require('./message.model'); 

getDatabase();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

app.post('/fcm', async (req, res, next) => {
    try {
        var message = {
            to: req.body.token, 
            
            notification: {
                title: req.body.title, 
                body: req.body.body
            },
            // data: req.body.data
        };

        fcm.send(message, async function(err, response){
            if (err) {
                next(err);
            } else {
                await Message.create({ title: req.body.title, body: req.body.body });
                res.status(200).json(response);
            }
        });
    } catch (err) {
        res.status(404).json({ error: 'Something has wrong!' })
    }
});

app.get('/fcm', async (req, res) => {
    try {
        const messages = await Message.find().select('-__v');
        res.status(200).json(messages);
    } catch (err) {
        res.status(404).send('Something went wrong!');
    }
})

app.delete('/fcm/:id', async (req, res) => {
    try {
        await Message.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });
        res.status(204).send();
    } catch (err) {
        res.status(404).send('Something went wrong!');
    }
})