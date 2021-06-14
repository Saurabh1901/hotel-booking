const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	bannerImage: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("hotel", hotelSchema)