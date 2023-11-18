const express = require('express');
const router = express.Router();
const groupController =require('../controller/groupcontroller');

// Fetching groups a user is part of
router.post('/user/getusersgroups', groupController.getUsersGroup);

// New group creation
router.post('/user/creategroup', groupController.createGroup);
router.post('/user/getsinglegroup', groupController.getSingleGroup);

module.exports = router;
