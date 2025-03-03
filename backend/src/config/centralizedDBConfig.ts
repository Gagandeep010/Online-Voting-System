import {MongoClient} from 'mongodb';
import {config} from 'dotenv';
import path from 'path';

config({path: path.resolve(__dirname, '../.env')});


const DB_CONNECTION = process.env.DB_CONNECTION;

if (!DB_CONNECTION) {
    throw new Error('DB_CONNECTION is not defined');
}
const connectDB = async () => {
    const client = new MongoClient(DB_CONNECTION);
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.log('Database connection error:', error);
    }
}

export default connectDB;