const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	facebookId: String,
	googleId: String,
	name: String,
	avatar: String,
	email: String,
	prefix: String,
	phone: String,
	password: String,
	role: { type: String, default: 'super_user'},
	date: Date,
	notifyCount: { type: Number, default: 0 },
	stores: [{type: Schema.Types.ObjectId, ref: 'Store'}],
	products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

mongoose.model("users", userSchema);
