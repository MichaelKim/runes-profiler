require('dotenv').config();
require('marko/node-require'); // Allow Node.js to require and load `.marko` files

const express = require("express");
const app     = express();
const comp    = require("compression");
const markoExpress = require('marko/express');

app.use(comp());
app.use(markoExpress()); //enable res.marko(template, data)

app.get('/*', (req, res, next) => {
	console.log('GET:', req.url);
	next();
});

app.use(express.static(__dirname + '/../public'));

app.use('/', require('./routes'));

app.use('/*', (req, res) => {
	// Send 404 page?
	res.redirect('http://localhost:5000');
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500);
	res.send('blek');
});

const port = process.env.PORT  || 5000;
app.listen(port, function() {
    console.log("listening on:" + port);
});
