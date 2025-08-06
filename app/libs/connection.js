import mongoose from "mongoose";

const connection = async (req, res) => {
        await mongoose.connect(process.env.MONGO_CONN)
                        .then(() => console.log('Connection is Success'))
                        .catch(err => console.log(err))
}

export default connection;