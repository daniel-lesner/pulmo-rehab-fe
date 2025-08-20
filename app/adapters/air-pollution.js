import ApplicationAdapter from './application';
export default class AirPollutionAdapter extends ApplicationAdapter {
  urlForCreateRecord(modelName, snapshot) {
    const isLocal = snapshot?.record?.mode === 'local';
    const resource = isLocal ? 'localAirPollutions' : 'airPollutions';
    return `${this.host}/${this.namespace}/${resource}`;
  }

  pathForType() {
    return 'airPollutions';
  }
}
