const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

require('./util/dbconnect'); // for db connection
const app = express();
global.__basedir=__dirname;
app.use(express.json());
app.use(cors());

app.use(require('./routes/user.route'));
app.use(require('./routes/post.route'));
app.use(require('./routes/file.route'));

app.listen(process.env.PORT, () => {
    console.log("server is running on port 5000");
});
