const express = require('express')
const bodyParser = require('body-parser')
const mongose = require('mongoose')
const routes = require('./router/routes')
const isAuth = require('./middleware/verify')
const app = express();


const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  app.use('/', routes);

  app.use(isAuth)

  mongose.connect("mongodb://prince:princc123@ds161794.mlab.com:61794/userdata-app", { useNewUrlParser: true })
          .then(console.log('connected to database succefully...'))
          .catch(err => console.log(err))


  app.listen(PORT, ()=> console.log('Listening on port :' + PORT))
  