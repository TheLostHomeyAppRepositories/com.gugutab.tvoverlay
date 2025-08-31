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

      const res = await fetch(`http://${data.ipAddress}:${data.port}/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const resJson = await res.json();
      if (resJson) {
        devices = [
          {
            name: resJson.result.settings.deviceName,
            settings: {
              ip: data.ipAddress,
              port: data.port,
            }
          },
        ];
        return resJson.result.settings.deviceName;
      }
      devices = [];
      return false;

    });

    session.setHandler("list_devices", async function () {
      return devices;
    });
  }

};
