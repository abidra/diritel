const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
	name: String,
	price: String,
	photos: Object,
	categories: String,
	Description: String,
	date: Date
});

mongoose.model("products", productSchema);
