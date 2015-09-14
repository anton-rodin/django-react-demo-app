var JSData = require('js-data');
var DSHttpAdapter = require('js-data-http');

var store = new JSData.DS();

// register and use http by default for async operations
store.registerAdapter('http', new DSHttpAdapter({
  basePath: '/api',
  deserialize: function (Resourse, data) {
    return data.data;
  }
}), {default: true});


module.exports = store;