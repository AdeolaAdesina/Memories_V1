# Memories_V1


# First Step - Set up React/Front end


- create a client folder
```npx create-react-app ./```



- create a server folder
create index.js
```npm init -y```
```npm install body-parser cors express mongoose nodemon```

- body parser is for sending post requests
- cors is to enable cross origin reques
- express is for creating the routing of the app
- mongoose is to create models for our app
- nodemon, so we don't have to manually reset the server every time.

Now go to index.js and import the dependencies.

```
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
```

Go to package.json after importing the modules and add this under main:

```"type": "module",
"scripts": {
  "start": "nodemon index.js"
}

```



Now let's install dependencies for the client side 

```npm install axios moment react-file-base64 redux reducx-think```

- Axios for making API requests
- moment for working with time and dates
- react-file-base64 to convert images
- redux
- redux-thunk for asynchronous actions


Now check the client folder, delete the SRC folder and create a new one.

Then in the SRC folder, create an index.js file - we're going to use this file to connect our react app to index.html file.


Index.js:

```
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

```


Now create App.js in src folder:

```
import React from 'react';

const App = () => {
    return (
        <div>
            <h1>App</h1>
        </div>
    );
}

export default App;
```


Now we should be ready to run our client side.

Run with ```npm start```

Close the terminal with Control + C.



# Second Step -  Set up our Backend


On the server folder, index.js:

```
import express, { application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//initialize the application
const app = express();

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




```

package.json:

```
 "scripts": {
    "start": "nodemon index.js"
  },
```

Then test the connection to MongoDB with ```npm start```

- Server should run on Port 5000.


# Create Routes for our application

 Create folder routes and file posts.js
 
 posts.js:
 
 ```
 import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('This works');
});

export default router;

```


index.js:

```
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

```


Now run  ```npm start``` and see localhost:5000/posts to see the new get request.


Create a new folder called controllers and file named posts.js

controllers/posts.js:

```
//We're going to create all the handlers for our routes
export const getPosts = (req, res) => {
    res.send('This works');
}
```

routes/posts.js:

```
import express from 'express';

import { getPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

export default router;
```



# Create models for our posts

create a new folder in Server called models and a file named postMessage.js

postMessage.js:

```
import mongoose from 'mongoose';

//We'll create a mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

//Now we have to turn the schema into a model

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
//export a mongoose modelfrom this file

```


Now that our model is done, we can start adding more routes.

routes/post.js:

we've added a createPost fx

```
import express from 'express';

import { getPosts, createPost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;

```

controller/posts.js:

```
import PostMessage from "../models/postMessage.js";

//We're going to create all the handlers for our routes
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
```

Now run ```npm start``` and see localhost:5000 to see an empty array.


# Develop front-end/client side


Install material-ui with ```npm install @material-ui/core```

