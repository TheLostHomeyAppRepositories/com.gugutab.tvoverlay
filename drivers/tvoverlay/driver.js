'use strict';

const Homey = require('homey');
module.exports = class TvOverlayDriver extends Homey.Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('TvOverlayDriver has been initialized');
  }

  async onPair(session) {
    let that = this;
    let devices = [];
    session.setHandler("validateLoginData", async function (data) {
      that.homey.app.api.setSettings(data.ipAddress, data.port);

      return that.homey.app.api.getInfo().then(info => {
        devices = [
          {
            name: info.settings.deviceName,
            data: { id: info.status.id },
            settings: {
              ip: data.ipAddress,
              port: data.port,
            }
          },
        ];

        return info.settings.deviceName;
      }).catch(err => {
        that.log('Error getting device info:', err);
        devices = [];
        return false;
      });
    });

    session.setHandler("list_devices", async function () {
      return devices;
    });
  }

  async onRepair(session, device) {
    let that = this;
    let devices = [];
    session.setHandler("validateLoginData", async function (data) {
      that.homey.app.api.setSettings(data.ipAddress, data.port);

      return that.homey.app.api.getInfo().then(info => {

        const settings =  {
              ip: data.ipAddress,
              port: data.port,
            };

        device.setSettings(settings).catch(err => {
          that.log('Error setting device settings:', err);
        });

        return info.settings.deviceName;
      }).catch(err => {
        that.log('Error getting device info:', err);
        devices = [];
        return false;
      });
    });
  }

};
