const rp = require('request-promise');

module.exports = class MetricsService {
  constructor({ token, password, host }, metric) {
    this.token = token;
    this.password = '';
    this.host = host;
    this.metric = metric;
  }

  buildPath(path) {
    const { token, password, host } = this;
    return `https://${token}:${password}@${host}/api/metrics/${path}`;
  }

  async search() {
    const url = this.buildPath('search');
    const response  = await rp(url);
    const { metrics } = JSON.parse(response);

    return metrics.some(metric => metric.key === this.metric);
  }

  async create(formData) {
    const uri = this.buildPath('create');

    const response = await rp({
      uri,
      ...formData,
      method: 'POST',
      json: true,
    });

    return response;
  }
};
