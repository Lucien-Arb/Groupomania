const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const modCtrl = require('../controllers/mod');

try{
    router.get('/post/:id/comments', auth, modCtrl.getAllComments);
    router.get('/posts', auth, modCtrl.getAllPosts);
    router.get('/users', auth, modCtrl.getAllUsers);
    router.delete('/comment/:id', auth, modCtrl.deleteComment);
    router.delete('/post/:id', auth, modCtrl.deletePost);
    router.delete('/user/:id', auth, modCtrl.deleteUser);
}catch (error){
    console.log(error);
}

module.exports = router;