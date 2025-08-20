import ApplicationSerializer from './application';

export default class LocalAirPollutionSerializer extends ApplicationSerializer {
  serialize(snapshot, options) {
    let json = super.serialize(snapshot, options);
    delete json.data.attributes.dt;

    delete json.data.attributes.pm25;
    delete json.data.attributes.pm10;
    delete json.data.attributes.pm1;
    delete json.data.attributes.pm0_3;

    delete json.data.attributes.co;
    delete json.data.attributes.co2;
    delete json.data.attributes.tvoc;
    delete json.data.attributes.hcho;

    delete json.data.attributes.temperatureC;
    delete json.data.attributes.humidity;
    delete json.data.attributes.batteryPercentage;
    delete json.data.attributes.charging;

    delete json.data.attributes.aqiLevel;
    delete json.data.attributes.aqiLabel;

    return json;
  }
}
