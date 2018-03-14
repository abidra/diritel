const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
	_shop: String,
	_user: String,
	avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
	title: String,
	datetime: Date,
	type: '通知',
});

mongoose.model("users", notificationSchema);
