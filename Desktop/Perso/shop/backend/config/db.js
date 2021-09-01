import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: 'true',
      useNewUrlParser: 'true',
      useCreateIndex: 'true',
    });
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
