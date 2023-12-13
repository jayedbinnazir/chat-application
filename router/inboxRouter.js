const express = require('express');
const { getInbox, searchUser, addConversation, getMessages, sendMessage } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { checkLogin } = require('../middlewares/common/checkLogin');

const router = express.Router();
const page_title = "Inbox"


//get inbox page
router.get('/', decorateHtmlResponse( page_title ),checkLogin , getInbox )

//searching users
router.post("/search", checkLogin , searchUser )

//add conversation
router.post("/conversation", checkLogin , addConversation )

//get messages

router.get('/messages/:conversation_id' , checkLogin , getMessages ) // get conversation id and send some information to the client aas a response

// send messages and update the message database

router.post("/message" , checkLogin , sendMessage  )

module.exports = router ;