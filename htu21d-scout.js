
const options = require('./options');

const Scout = require('zetta-scout');
const htu21d = require('./htu21d');
const util = require('util');

const Htu21dScout = module.exports = function(opts) {
    
  // see if any of the options were overridden in the server

  if (typeof opts !== 'undefined') {
    // copy all options defined in the server
    for (const key in opts) {
      if (typeof opts[key] !== 'undefined') {
        options[key] = opts[key];
      }
    }
  }

  Scout.call(this);
};

util.inherits(Htu21dScout, Scout);

Htu21dScout.prototype.init = function(next) {

  const self = this;

  const Htu21d = new htu21d(options);

  const query = this.server.where({name: 'HTU21D'});
  
  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], Htu21d, options);
      self.server.info('Provisioned HTU21D');
    } else {
      self.discover(Htu21d, options);
      self.server.info('Discovered new device HTU21D');
    }
  });

  next();

};
