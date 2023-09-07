const mongoose = require('mongoose');

module.exports = connection = async () => {
  try {
    mongoose
      .connect(process.env.DBCONNECT)
      .then(() => {
        console.log('Connected to mongoDB');
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log(error, 'could not connect database.');
  }
};
