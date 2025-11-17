import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  image: {
    type: String,
    required: [true, 'Project image is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Project', projectSchema);
