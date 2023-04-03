# Memories_V1

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

```"type": "module",```
