import {MongoClient} from 'mongodb';
import {config} from 'dotenv';

config();

const CENTRALIZED_DB_URI = process.env.CENTRALIZED_DB_URI;
console.log('CENTRALIZED_DB_URI:', CENTRALIZED_DB_URI);

if (!CENTRALIZED_DB_URI) {
    throw new Error('CENTRALIZED_DB_URI is not defined');
}
const connectDB = async () => {
    const client = new MongoClient(CENTRALIZED_DB_URI);
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.log('Database connection error:', error);
    }
}

export default connectDB;