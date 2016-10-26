const pg = require("pg");
const settings = require("./settings");
const name = process.argv[2];
var knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  ssl      : settings.ssl
  }
});

console.log("Searching...")
knex.select("").from("famous_people").where("first_name", "=", `${name}`).asCallback((err, rows) => {
  if (err) {
    console.log(err);
  }
  console.log(`Found ${rows.length} person(s) by the name ${name}`)
  console.log(rows);
  knex.destroy();
});



