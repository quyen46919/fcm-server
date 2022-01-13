
const mongoose = require('mongoose');

const getDatabase = async () => {
    try {
        mongoose.connect(
            process.env.MONGODB_URL,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            },
            () => { console.log("connected to mongodb!") }
          );
    } catch (err) {
      console.log("err", err);
    }
}

module.exports = {
  getDatabase
};