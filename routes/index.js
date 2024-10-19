var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./posts')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alluserspost', async function(req, res, next) {
  let user = await userModel.findOne({_id:"6713c8c8f8469fa9cd91aa15"})
  .populate("posts")
  res.send(user)
})

router.get('/createuser',async function(req,res,next){
  let createduser = await userModel.create({
    username:"Jon",
    password:"Jon",
    posts: [],
    email: "Jon123@mail.com",
    fullName: "Jon Marten Star",
  })
  res.send(createduser)
})

router.get('/createpost',async function(req,res,next){
  let createdpost = await postModel.create({
    postText:"I'm Jon star",
    user:"6713c8c8f8469fa9cd91aa15"
  })
  let user = await userModel.findOne({_id:"6713c8c8f8469fa9cd91aa15"})
  user.posts.push(createdpost._id)
  await user.save()
  res.send("done")
})

module.exports = router;
