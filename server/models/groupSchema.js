const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, 'Group name is required.'],
  },
  admin: {
    type: Object,
    required: true,
  },
  members:{
    type: Array,
    required:true,
  }
});

const Group = mongoose.model('Groups', groupSchema);

module.exports = Group;
