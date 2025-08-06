import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "agent" },
  tasks: [
    {
      FirstName: String,
      Phone: String,
      Notes: String,
    },
  ],
});

const task =  mongoose.models.task || mongoose.model('task', taskSchema);

export default task;