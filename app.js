'use strict';

const Homey = require('homey');
const TvOverlayAPI = require('./lib/tvoverlay-api');
const toArray = require('stream-to-array');

module.exports = class TvOverlay extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('TvOverlay has been initialized');
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
          args.corner,
          args.seconds
        ).catch(this.error);
      }
      return Promise.resolve(true);
    });
    //
    const _sendNotificationImageShort = this.homey.flow.getActionCard('send_device_notification_image_short');
    _sendNotificationImageShort.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        //
        if(args.droptoken != null) {
          const stream = await args.droptoken.getStream();

          const buffer = await toArray(stream).then(function (parts) {
            const buffers = parts.map(part => Buffer.isBuffer(part) ? part : Buffer.from(part));
            return Buffer.concat(buffers);
          });

          return this.homey.app.api.sendNotifyWithImage(
            args.message,
            args.title,
            0,
            null,
            buffer.toString('base64'),
            null,
            null,
            args.corner,
            args.seconds
          ).catch(this.error);
        }
      }
      return Promise.resolve(true);
    });
    //
    const _sendNotificationImageUrlShort = this.homey.flow.getActionCard('send_device_notification_imageurl_short');
    _sendNotificationImageUrlShort.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        return this.homey.app.api.sendNotifyWithImage(
          args.message,
          args.title,
          0,
          null,
          args.image,
          null,
          null,
          args.corner,
          args.seconds
        );
      }
      return Promise.resolve(true);
    });
    //
    const _sendNotificationVideoUrlShort = this.homey.flow.getActionCard('send_device_notification_videourl_short');
    _sendNotificationVideoUrlShort.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        return this.homey.app.api.sendNotifyWithVideo(
          args.message,
          args.title,
          0,
          null,
          args.video,
          null,
          null,
          args.corner,
          args.seconds
        ).catch(this.error);
      }
      return Promise.resolve(true);
    });
    //
    const _sendNotificationImageAll = this.homey.flow.getActionCard('send_device_notification_image_all');
    _sendNotificationImageAll.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        //
        if(args.droptoken != null) {
          const stream = await args.droptoken.getStream();

          const buffer = await toArray(stream).then(function (parts) {
            const buffers = parts.map(part => Buffer.isBuffer(part) ? part : Buffer.from(part));
            return Buffer.concat(buffers);
          });

          return this.homey.app.api.sendNotifyWithImage(
            args.message,
            args.title,
            0,
            args.color,
            buffer.toString('base64'),
            args.smallIcon,
            args.largeIcon,
            args.corner,
            args.seconds
          ).catch(this.error);
        }
      }
      return Promise.resolve(true);
    });
    //
    const _sendNotificationImageUrlAll = this.homey.flow.getActionCard('send_device_notification_imageurl_all');
    _sendNotificationImageUrlAll.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        return this.homey.app.api.sendNotifyWithImage(
          args.message,
          args.title,
          0,
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
    //
    const _sendNotificationVideoUrlAll = this.homey.flow.getActionCard('send_device_notification_videourl_all');
    _sendNotificationVideoUrlAll.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        return this.homey.app.api.sendNotifyWithVideo(
          args.message,
          args.title,
          0,
          args.color,
          args.video,
          args.smallIcon,
          args.largeIcon,
          args.corner,
          args.seconds
        ).catch(this.error);
      }
      return Promise.resolve(true);
    });
    // send_device_set_screen_on
    const _sendDeviceSetScreenOn = this.homey.flow.getActionCard('send_device_set_screen_on');
    _sendDeviceSetScreenOn.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        return this.homey.app.api.setScreenOn().catch(this.error);
      }
      return Promise.resolve(true);
    });
    // set_notification_layout
    const _setNotificationLayout = this.homey.flow.getActionCard('set_notification_layout');
    _setNotificationLayout.registerRunListener(async (args, state) => {
      if (typeof args.device.getData() !== 'undefined') {
        const settings = args.device.getSettings();
        this.homey.app.api.setSettings(settings.ip, settings.port);
        return this.homey.app.api.setNotificationLayout(
          args.imageDisplay,
          args.imageSmall,
          args.sourceDisplay,
        ).catch(this.error);
      }
      return Promise.resolve(true);
    });
  }
};
