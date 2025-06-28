import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
});

export default mongoose.model("Contact", contactSchema);
