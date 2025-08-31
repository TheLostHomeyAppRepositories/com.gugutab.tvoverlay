'use strict';

const Homey = require('homey');
const TvOverlayAPI = require('./lib/tvoverlay-api');

module.exports = class TvOverlay extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyApp has been initialized');
    this.api = new TvOverlayAPI();
    //
    const _sendNotification = this.homey.flow.getActionCard('send_device_notification');
    _sendNotification.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        return this.homey.app.api.sendNotify(
          args.message,
          args.title,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          args.corner,
          args.seconds
        );
      }
      return Promise.resolve(true);
    });
    //
    const _sendNotificationImageUrlAll = this.homey.flow.getActionCard('send_device_notification_imageurl_all');
    _sendNotificationImageUrlAll.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        return this.homey.app.api.sendNotify(
          args.message,
          args.title,
          0,
          null,
          null,
          args.color,
          args.image,
          args.smallIcon,
          args.largeIcon,
          args.corner,
          args.seconds
        );
      }
      return Promise.resolve(true);
    });
  }

};
