import express, { application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from "./routes/posts.js";

//initialize the application
const app = express();

app.use('/posts', postRoutes);

//let's do some setup
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//now we will connect our server with a real DB - MongoDB - https://www.mongodb.com/cloud/atlas/register

const CONNECTION_URL = 'mongodb+srv://adeolaadesina:7h8nqMrcRb0S3P7Q@clustermemories.uupnsl8.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


//mongoose.set('useFindAndModify', false);