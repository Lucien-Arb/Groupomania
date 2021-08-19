const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const userCtrl = require('../controllers/user');

try{
    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.get('/', auth, userCtrl.seeMyProfile);
    router.delete('/', auth, userCtrl.deleteUser);
    router.put('/', auth, userCtrl.updateUser);
}catch (error){
    console.log(error);
}

module.exports = router;