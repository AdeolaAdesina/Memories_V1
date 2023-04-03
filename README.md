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
