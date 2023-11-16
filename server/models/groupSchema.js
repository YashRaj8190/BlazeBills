const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Group name is required.'],
  },
  admin: {
    type: String,
    required: true,
  },
  members:{
    type: Array,
    required:true,
  }
});

const Group = mongoose.model('Groups', groupSchema);

module.exports = Group;
