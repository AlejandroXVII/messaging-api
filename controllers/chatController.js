const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Chat = require("../models/chat");

exports.chat_list_get = asyncHandler(async (req, res, next) => {
	const allChat = await Chat.find().exec();
	return res.send(Object.values(allChat));
});

exports.chat_get = asyncHandler(async (req, res, next) => {
	const chat = await Chat.findById(req.params.id).exec();
	return res.send(chat);
});

exports.chat_post = asyncHandler(async (req, res, next) => {
	// Extract the validation errors from a request.
	const errors = validationResult(req);

	const chat = new Chat({
		messages: [
			{
				sender_id: req.body.from,
				text: req.body.text,
			},
		],
	});

	if (!errors.isEmpty()) {
		res.send(400);
		return;
	} else {
		// Data from form is valid
		await chat.save();
		res.send(chat);
	}
});
