const pg = require("pg");
const settings = require("./settings"); // settings.json
let name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...")

  client.query(`SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text`, [`${name}`], function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name ${name}`)
    console.log(result.rows); //output: 1
    client.end();
  });
});