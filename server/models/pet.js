const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must have at least 3 characters"]
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    minlength: [3, "Type must have at least 3 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [3, "Description must have at least 3 characters"]
  },
  likes: {
    type: Number,
    default: 0
  },
  skill_1: { type: String },
  skill_2: { type: String },
  skill_3: { type: String }


  
}, {timestamps: true});

mongoose.model("Pet", PetSchema);