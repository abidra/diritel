const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
	name: String,
	domain: String,
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

mongoose.model("stores", storeSchema);
