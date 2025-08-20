import ApplicationSerializer from './application';

const genId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default class AirPollutionSerializer extends ApplicationSerializer {
  modelNameFromPayloadType(type) {
    if (!type) return super.modelNameFromPayloadType(type);
    if (
      type === 'airPollutions' ||
      type === 'air-pollutions' ||
      type === 'localAirPollutions' ||
      type === 'local-air-pollutions'
    ) {
      return 'air-pollution';
    }
    return super.modelNameFromPayloadType(type);
  }

  serialize(snapshot, options) {
    const mode = snapshot?.record?.mode;
    if (mode === 'local') {
      return {
        data: {
          type: 'local-air-pollutions',
          attributes: {
            deviceId: snapshot.attr('deviceId'),
          },
        },
      };
    }

    return {
      data: {
        type: 'air-pollutions',
        attributes: {
          lat: snapshot.attr('lat'),
          lon: snapshot.attr('lon'),
        },
      },
    };
  }

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload && !payload.data && payload.id && payload.type) {
      payload = { data: payload };
    }
    if (!payload || !payload.data) {
      payload = {
        data: { id: genId(), type: 'air-pollution', attributes: {} },
      };
    }
    payload.data.id = String(payload.data.id || genId());
    payload.data.type =
      this.modelNameFromPayloadType(payload.data.type) || 'air-pollution';

    const a = payload.data.attributes || {};
    if (a.pm25 !== undefined && a.pm2_5 === undefined) a.pm2_5 = a.pm25;
    if (a.pm03 !== undefined && a.pm0_3 === undefined) a.pm0_3 = a.pm03;
    if (a.temperatureC !== undefined && a.temperature_c === undefined)
      a.temperature_c = a.temperatureC;
    if (a.aqiLevel !== undefined && a.aqi_level === undefined)
      a.aqi_level = a.aqiLevel;
    if (a.aqiLabel !== undefined && a.aqi_label === undefined)
      a.aqi_label = a.aqiLabel;

    payload.data.attributes = a;
    return super.normalizeResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType,
    );
  }
}
