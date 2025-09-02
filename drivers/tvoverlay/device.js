'use strict';

const Homey = require('homey');

module.exports = class TvOverlayDevice extends Homey.Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    if (this.hasCapability('onoff')) {
      await this.removeCapability('onoff');
    }
    if (!this.hasCapability('set_screen_on')) {
      await this.addCapability('set_screen_on');
    }
    this.log('TvOverlayDevice has been initialized');
    this.registerCapabilityListener('set_screen_on', async (value) => {
      this.log('Setting screen on');
      const settings = this.getSettings();
      this.homey.app.api.setSettings(settings.ip, settings.port);
      this.homey.app.api.setScreenOn();
      this.setCapabilityValue('set_screen_on', true);
      return false;
    });
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('TvOverlayDevice has been added');
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeys }) {
    this.log('TvOverlayDevice settings where changed');
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
    this.log('TvOverlayDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('TvOverlayDevice has been deleted');
  }

};
