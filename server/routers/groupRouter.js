const express = require('express');
const router = express.Router();
const Group= require('../models/groupSchema')

// Fetching groups a user is part of
router.get('/user/groups', async (req, res) => {
    try {
      const userPhone = 8346956239; // Assuming userPhone is the variable containing the user's phone number fetched through his details
  
      const groups = await Group.find({ 'members.phone': userPhone });
  
      res.json(groups);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Some error occurred' });
    }
  });

// New group creation
router.post('/user/create-group', async (req, res) => {
  try {
    const { name, admin, members } = req.body;
    const newGroup = new Group({
      name,
      admin,
      members,
    });

    await newGroup.save();

    res.status(201).json({ message: 'Group created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Some error occurred' });
  }
});

module.exports = router;
