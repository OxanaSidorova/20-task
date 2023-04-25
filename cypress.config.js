const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    db:{
      host:"sql8.freemysqlhosting.net",
      user:"sql8614173",
      password:"ETQLxs86kn",
      database: "sql8614173"
    }
  },
  e2e: {

    setupNodeEvents(on, config) {
      on("task",{
        queryDB:(query)=> {
        return queryTestDb(query,config);
        }

      })
      // implement node event listeners here
    },
  },
});
const mysql = require("mysql");
function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db)
  connection.connect();
  return new Promise((resolve,reject)=> {
    connection.query(query, (error, results)=>{
      if (error) reject (error);
      else {
        connection.end();
        return resolve (results);
      }
    })
  })

}

