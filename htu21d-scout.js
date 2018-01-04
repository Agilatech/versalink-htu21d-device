const config = require('./config');
const Scout = require(process.versalink.scout);
const Htu21d = require('./htu21d');

module.exports = class Htu21dScout extends Scout {

  constructor(opts) {

    super();

    if (typeof opts !== 'undefined') {
      // copy all config options defined in the server
      for (const key in opts) {
        if (typeof opts[key] !== 'undefined') {
          config[key] = opts[key];
        }
      }
    }

    if (config.name === undefined) { config.name = "HTU21D" }
    this.name = config.name;

    this.htu21d = new Htu21d(config);

  }

  init(next) {
    const query = this.server.where({name: this.name});
  
    const self = this;

    this.server.find(query, function(err, results) {
      if (!err) {
        if (results[0]) {
          self.provision(results[0], self.htu21d);
          self.server.info('Provisioned known device ' + self.name);
        } else {
          self.discover(self.htu21d);
          self.server.info('Discovered new device ' + self.name);
        }
      }
      else {
        self.server.error(err);
      }
    });

    next();
  }

}
