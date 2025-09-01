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

    async sendNotifyWithImage(
      message = '',
      title = '',
      id = 0,
      color = '',
      image = '',
      smallIcon = '',
      largeIcon = '',
      corner = '',
      seconds = 60,
      ) {
        return new Promise((resolve, reject) => {
          const params = {
            message: message,
            title: title,
            id: id,
            appTitle: 'Homey',
            color: color,
            image: image,
            smallIcon: smallIcon,
            largeIcon: largeIcon,
            corner: corner,
            seconds: seconds
          };
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
    message = '',
    title = '',
    id = 0,
    color = '',
    video = '',
    smallIcon = '',
    largeIcon = '',
    corner = '',
    seconds = 60,
  ) {
    return new Promise((resolve, reject) => {
      const params = {
        message: message,
        title: title,
        id: id,
        appTitle: 'Homey',
        color: color,
        video: video,
        smallIcon: smallIcon,
        largeIcon: largeIcon,
        corner: corner,
        seconds: seconds
      };
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
