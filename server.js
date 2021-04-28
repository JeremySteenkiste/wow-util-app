const express =require('express');
const path = require('path');

const app = express();


app.use(express.static('./dist/heroku-test-ng-app/'));

app.get('/*',(req,res) => res.send('index.html',{root:'dist/heroku-test-ng-app/'}));

app.listen(process.env.PORT || '8080');