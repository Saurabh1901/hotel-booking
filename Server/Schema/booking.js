const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
	hotel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "hotel",
		required: true
	},
	bookedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	bookedOn: {
		type: Date,
		required: true
	}
       });

module.exports = mongoose.model("booking", bookingSchema)