const mysql = require('mysql');
const mock = require('mockjs')
import { sql } from './insertData'
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'todo',
  port: 3306
})

connect.connect();
// connect.query(sql, function (error, result, fields) {
//   if (error) throw error;
//   if (result.affectedRows === 1) {
//     console.log('数据插入成功')
//   }
// });

// connect.end();
