const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const Image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Baro8282!!',
      database : 'smart-brain'
    }
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/profile/:id', profile.handleProfileGet(db))
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.put('/image', Image.handleImage(db))
app.post('/imageurl', Image.handleApiCall())

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
