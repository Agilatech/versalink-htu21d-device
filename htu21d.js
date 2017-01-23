
const VersalinkDevice = require('@agilatech/versalink-device');
const device = require('@agilatech/htu21d');

module.exports = class Htu21d extends VersalinkDevice {
    
    constructor(options) {
        
        // The bus/file must be defined. If not supplied in options, then default to i2c-1
        const bus  = options['bus'] || "/dev/i2c-1";
        
        // Instantiate the sensor with the bus, and hardcoded address
        const hardware = new device.Htu21d(bus, 0x40);
        
        super(hardware, options);
        
    }
}

