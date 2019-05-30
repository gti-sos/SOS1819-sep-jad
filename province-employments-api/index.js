var api = require("./v1");

module.exports = function(app, BASE_PATH, provinceEmployments){
    api(app, BASE_PATH+"/v1", provinceEmployments);
};