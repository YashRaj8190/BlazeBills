const express = require('express');
const router = express.Router();
const groupController =require('../controller/groupcontroller');
const authenticate=require('../Middleware/AuthMiddleware');
// Fetching groups a user is part of
router.post('/user/getusersgroups', authenticate,groupController.getUsersGroup);

// New group creation
router.post('/user/creategroup', authenticate,groupController.createGroup);
router.post('/user/getsinglegroup', authenticate,groupController.getSingleGroup);
router.post('/user/check-user',authenticate, groupController.checkUser);

module.exports = router;
