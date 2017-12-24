const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true
});

module.exports = {
  query: (text, params, callback) => {
  	console.log("Querying: " + text, params);
    return pool.query(text, params, callback);
  }
};