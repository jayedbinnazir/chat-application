const express = require('express');
const { getInbox, searchUser, addConversation } = require('../controller/inboxController');
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


module.exports = router ;