
// get inbox page

const escape = require("../utility/escape");
const User = require("../models/people");
const Conversation = require("../models/Conversation");

 
async function getInbox(req,res,next){
  try {
    const conversations = await Conversation.find({
      $or:[
        {"creator.id": req.user.userId },
        { "participant.id": req.user.userId }
      ]
    })

    console.log(conversations)
    res.locals.data = conversations ;
    res.render('inbox')

  } catch(err){
    next(err)
  }

}

async function searchUser(req,res,next){
    const user = req.body.user ;
    const searchQuery = user.replace("+88" , '' )

    const name_search_regex = new RegExp(escape(searchQuery) , "i");
    const mobile_search_regex = new RegExp("^"+escape("+88"+searchQuery) );
    const email_search_regex = new RegExp("^" + escape(searchQuery) + "$", "i");

   try{
    if (searchQuery !== "") {
        const users = await User.find(
          {
            $or: [
              {
                name: name_search_regex,
              },
              {
                mobile: mobile_search_regex,
              },
              {
                email: email_search_regex,
              },
            ],
          },
        );
  
        res.json(users);
      } else {
        throw createError("You must provide some text to search!");
      }
    
   } catch(err){
    res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
   }
}

async function addConversation(req,res,next){

  try {

    const newConversation = new Conversation({
      creator:{
       id:req.user.userId ,
       name:req.user.username,
       avatar:req.user.avatar
 
      },
      participant:{
       id: req.body.participant_id ,
       name:req.body.participant,
       avatar:req.body.avatar
      }
   })

   const result = newConversation.save() ;

   res.status(200).json({
    message:"conversation added successfully"
   })


  }catch(err){
    //if error in database
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }

 


}

module.exports = {
    getInbox,
    searchUser,
    addConversation
}