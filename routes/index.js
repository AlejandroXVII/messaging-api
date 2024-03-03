var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const chat_controller = require("../controllers/chatController");

function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers["authorization"];
	// Check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		// Split at the space
		const bearer = bearerHeader.split(" ");
		// Get token from array
		const bearerToken = bearer[1];
		// Set the token
		req.token = bearerToken;
		// Next middleware
		next();
	} else {
		// Forbidden
		res.sendStatus(403);
	}
}

//USER ROUTERS

router.get("/users", user_controller.user_list_get);

router.get("/users/:id", user_controller.user_get);

router.post("/users/", user_controller.user_post);

router.put("/users/:id", user_controller.user_put);

router.delete("/users/:id", user_controller.user_delate);

//CHATS ROUTERS
//THE BODY NEED A TO AND A FROM AS WELL AS THE MESSAGE TEXT
router.get("/chats", chat_controller.chat_list_get);

router.get("/chats/:id", chat_controller.chat_get);

router.post("/chats", chat_controller.chat_post);

// LOGIN ROUTERS

router.post("/login", user_controller.user_login);

module.exports = router;
