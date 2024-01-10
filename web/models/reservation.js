const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
      checkin: {
        type: Date,
        required: true,
      },
      checkout: {
        type: Date,
        required: true,
      },
      promo: {
        type: String,
      },
      chambre: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      usersId: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    }, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;