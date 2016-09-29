/**
 * config
 */

var path = require('path');

var config = {
  // mongodb 配置
  db: 'mongodb://127.0.0.1/homegarden',

  // redis 配置，默认是本地
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',
  
  session_secret: 'home_garden_secret', // 务必修改

  auth_cookie_name: 'home_garden',
}
module.exports = config;