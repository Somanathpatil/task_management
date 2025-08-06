import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
    {
        email: {type: String},
        password: {type: String},
        userName: {type: String},
        phoneNo: {type: String}
    }
);

const agent = mongoose.models.agent || mongoose.model('agent', agentSchema);

export default agent;