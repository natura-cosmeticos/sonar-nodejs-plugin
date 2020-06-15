const rp = require('request-promise');

module.exports = class SonarService {
  constructor({
    host,
    password,
    projectKey,
    token,
  }) {
    this.token = token;
    this.password = password;
    this.host = host;
    this.projectKey = projectKey;
  }

  buildPath(endpoint, path) {
    const { token, password, host } = this;

    return `http://${token}:${password}@${host}/api/${endpoint}/${path}`;
  }

  async validateCredentials() {
    const url = this.buildPath('authentication', 'validate');
    const response = await rp(url);

    try {
      return JSON.parse(response);
    } catch (err) {
      throw ('Could not parse sonar qube validate response: ', err);
    }
  }

  async search(endpoint, params = '') {
    const url = this.buildPath(endpoint, `search${params}`);
    const response = await rp(url);

    try {
      return JSON.parse(response);
    } catch (err) {
      throw ('Could not parse sonar qube search response: ', err);
    }
  }

  upsert(endpoint, action, formData) {
    const params = {
      formData,
      json: true,
      method: 'POST',
      uri: this.buildPath(endpoint, action),
    };

    return rp(params);
  }

  async upsertMetric(payload) {
    const { metrics } = await this.search('metrics');
    const metric = metrics.find(item => item.key === payload.key);

    if (!metric) return this.upsert('metrics', 'create', payload);

    return this.upsert('metrics', 'update', {
      ...payload,
      id: metric.id,
    });
  }

  async upsertCustomMeasure(payload) {
    const { customMeasures } = await this.search('custom_measures', `?projectKey=${this.projectKey}`);
    const customMeasure = customMeasures.find(item => item.metric.key === payload.key);

    if (!customMeasure) {
      return this.upsert('custom_measures', 'create', {
        ...payload,
        projectKey: this.projectKey,
      });
    }

    return this.upsert('custom_measures', 'update', {
      id: customMeasure.id,
      value: payload.value,
    });
  }
};
