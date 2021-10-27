const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "jiazhan",
  database: "wjdc",
});

class Mysql {
  constructor() {}
  query(sqlyj) {
    return new Promise((resolve, reject) => {
      pool.query(sqlyj, function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
        // console.log('The solution is: ', results[0].solution);
      });
    });
  }
  insert(sqlyj, sqlobj) {
    return new Promise((resolve, reject) => {
      pool.query(sqlyj, sqlobj, function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
        // console.log('The solution is: ', results[0].solution);
      });
    });
  }
}

module.exports = new Mysql();
