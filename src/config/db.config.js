import mongoose from 'mongoose';

const connect = async () => {
 mongoose.set('strictQuery', true);
 const db = await mongoose.connect(process.env.DB_URL);
 console.log('Database Connected');
 return db;
}

export default connect;
