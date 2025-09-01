const BaseClient = require('./base-class');
const WebClient = require('./web-client');

class TvOverlayAPI extends BaseClient {
    constructor(...props) {
        super(...props);
        this.webclient = new WebClient();
    }

    setSettings(host, port) {
        this.webclient._serverHost = host;
        this.webclient._serverPort = port;
    }

    setHomeyObject(homey) {
        this.homey = homey;
        this.webclient.setHomeyObject(homey);
    }

    async getInfo() {
        return new Promise((resolve, reject) => {
            this.webclient.get('get')
                .then(response => {
                    let result = JSON.parse(response);

                    if (result) {
                        return resolve(result.result);
                    } else {
                        return reject(new Error('Error obtaining info.'));
                    }
                })
                .catch(error => reject(error));
        });
    }

  async sendNotify(
    message = null,
    title = null,
    id = 0,
    color = null,
    smallIcon = null,
    largeIcon = null,
    corner = null,
    seconds = 60,
  ) {
    return new Promise((resolve, reject) => {
      const params = {
        appTitle: 'Homey',
      };

      if (message !== null && message !== '') {
        params.message = message;
      }
      if (title !== null && title !== '') {
        params.title = title;
      }
      if (id !== null && id !== 0) {
        params.id = id;
      }
      if (color !== null && color !== '') {
        params.color = color;
      }
      if (smallIcon !== null && smallIcon !== '') {
        params.smallIcon = smallIcon;
      }
      if (largeIcon !== null && largeIcon !== '') {
        params.largeIcon = largeIcon;
      }
      if (corner !== null && corner !== '') {
        params.corner = corner;
      }
      if (seconds !== null) {
        params.seconds = seconds;
      }

      this.webclient.post('notify', params)
        .then(response => {
          let result = JSON.parse(response);

          if (result) {
            return resolve(result);
          } else {
            return reject(new Error('Error send notify.'));
          }
        })
        .catch(error => reject(error));
    });
  }

    async sendNotifyWithImage(
      message = null,
      title = null,
      id = 0,
      color = null,
      image = null,
      smallIcon = null,
      largeIcon = null,
      corner = null,
      seconds = 60,
      ) {
        return new Promise((resolve, reject) => {
          const params = {
            appTitle: 'Homey',
          };

          if (message !== null && message !== '') {
            params.message = message;
          }
          if (title !== null && title !== '') {
            params.title = title;
          }
          if (id !== null && id !== 0) {
            params.id = id;
          }
          if (color !== null && color !== '') {
            params.color = color;
          }
          if (smallIcon !== null && smallIcon !== '') {
            params.smallIcon = smallIcon;
          }
          if (largeIcon !== null && largeIcon !== '') {
            params.largeIcon = largeIcon;
          }
          if (corner !== null && corner !== '') {
            params.corner = corner;
          }
          if (seconds !== null) {
            params.seconds = seconds;
          }
          if (image !== null && image !== '') {
            params.image = image;
          }
            this.webclient.post('notify', params)
                .then(response => {
                    let result = JSON.parse(response);

                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(new Error('Error send notify.'));
                    }
                })
                .catch(error => reject(error));
        });
    }

  async sendNotifyWithVideo(
    message = null,
    title = null,
    id = 0,
    color = null,
    video = null,
    smallIcon = null,
    largeIcon = null,
    corner = null,
    seconds = 60,
  ) {
    return new Promise((resolve, reject) => {
      const params = {
        appTitle: 'Homey',
      };

      if (message !== null && message !== '') {
        params.message = message;
      }
      if (title !== null && title !== '') {
        params.title = title;
      }
      if (id !== null && id !== 0) {
        params.id = id;
      }
      if (color !== null && color !== '') {
        params.color = color;
      }
      if (smallIcon !== null && smallIcon !== '') {
        params.smallIcon = smallIcon;
      }
      if (largeIcon !== null && largeIcon !== '') {
        params.largeIcon = largeIcon;
      }
      if (corner !== null && corner !== '') {
        params.corner = corner;
      }
      if (seconds !== null) {
        params.seconds = seconds;
      }
      if (video !== null && video !== '') {
        params.video = video;
      }

      this.webclient.post('notify', params)
        .then(response => {
          let result = JSON.parse(response);

          if (result) {
            return resolve(result);
          } else {
            return reject(new Error('Error send notify.'));
          }
        })
        .catch(error => reject(error));
    });
  }

}

module.exports = TvOverlayAPI;
