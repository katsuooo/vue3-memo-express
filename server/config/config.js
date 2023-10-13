/*
 config if
*/
var fs = require('fs');
var yaml = require('js-yaml');
var CONFIG = '';
try {
    CONFIG = yaml.load(fs.readFileSync('./config/memoConfig.yaml'));
}catch (e){
    console.log(e);
}
//console.log(CONFIG.mongodb);

module.exports = {
    MONGOINFO: CONFIG.mongodb,
    CONFIG: CONFIG
}