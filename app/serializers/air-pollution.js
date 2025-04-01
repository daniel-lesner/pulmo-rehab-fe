import ApplicationSerializer from './application';

export default class AirPollutionSerializer extends ApplicationSerializer {
  serialize(snapshot, options) {
    let json = super.serialize(snapshot, options);

    delete json.data.attributes.co;
    delete json.data.attributes.no;
    delete json.data.attributes.no2;
    delete json.data.attributes.o3;
    delete json.data.attributes.so2;
    delete json.data.attributes.pm25;
    delete json.data.attributes.pm10;
    delete json.data.attributes.nh3;
    delete json.data.attributes.dt;

    return json;
  }
}
