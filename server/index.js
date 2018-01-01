require('dotenv').config();

const express = require("express");
const app     = express();
const comp    = require("compression");

app.use(comp());

app.use(express.static(__dirname + '/../public'));

app.use('/', require('./routes'));

app.use('/*', (req, res) => {
	// Send 404 page?
	res.redirect('/');
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
