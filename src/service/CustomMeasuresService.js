const rp = require('request-promise');

module.exports = class CustomMeasureService {
  constructor({ token, password, host, projectKey }, metric) {
    this.token = token;
    this.password = '';
    this.host = host;
    this.metric = metric;
    this.projectKey = projectKey;
  }

  buildPath(path) {
    const { token, password, host } = this;
    return `https://${token}:${password}@${host}/api/custom_measures/${path}`;
  }

  async search() {
    const url = this.buildPath(`search?projectKey=${this.projectKey}`);
    const response = await rp(url);
    const { customMeasures } = JSON.parse(response);

    return customMeasures.some(customMeasure => customMeasure.metric.key === this.metric);
  }

  async create(formData) {
    const uri = this.buildPath('create');

    const payload = {
      ...formData,
      projectKey: this.projectKey,
    };

    const response = await rp({
      uri,
      formData: payload,
      method: 'POST',
      json: true,
    });

    return response;
  }

  async update(formData) {
    const uri = this.buildPath('update');

    const response = await rp({
      uri,
      ...formData,
      method: 'POST',
      json: true,
    });

    return response;
  }
};
