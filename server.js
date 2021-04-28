const express =require('express');
const path = require('path');

const app = express();


app.use(express.static('./dist/wow-util-app/'));

app.get('/*',(req,res) => res.send('index.html',{root:'dist/wow-util-app/'}));

app.listen(process.env.PORT || '8080');