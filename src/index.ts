/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:19:07
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-14 20:37:33
 */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { Promise } from 'mongoose';
import router from 'router';

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

const MONGO_URL = 'mongodb+srv://xuhanfeng:xuhanfeng@cluster0.rvqhbsb.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err: Error) => console.log(err));

app.use('/', router());
