import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Agent', agentSchema);


