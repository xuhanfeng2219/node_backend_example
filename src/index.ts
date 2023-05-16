/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:19:07
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-16 14:20:22
 */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { Promise } from 'mongoose';
import router from './router/index';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8088, ()  => {
    console.log('Server running on http://localhost:8088');
});

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
const MONGO_URL = 'mongodb://44.202.149.94:28017/sweet';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, options).then(() => {
    console.log('Connected to mongodb successful!');
}, (err: Error) => console.log(err) )
// mongoose.connection.on('error', (err: Error) => console.log(err));

app.use('/', router());
