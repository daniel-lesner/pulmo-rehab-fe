export const DATA_TYPES = [
  { value: 'stats', label: 'Daily Stats' },
  { value: 'heartRate', label: 'Heart Rate' },
  { value: 'hrv', label: 'Heart Rate Variability' },
  { value: 'stress', label: 'Stress' },
  { value: 'bodyBatteryLevel', label: 'Body Battery Level' },
  { value: 'spo2', label: 'SpO2' },
  { value: 'respiration', label: 'Respiration' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'activities', label: 'Activities' },
  { value: 'moveiq', label: 'Move IQ' },
  { value: 'epochs', label: 'Epochs' },
  { value: 'fitnessAge', label: 'Fitness Age' },
];

export const DISPLAY_TITLES = {
  heartRate: 'Heart Rate (BPM)',
  hrv: 'Heart Rate Variability (ms)',
  spo2: 'SpO2 %',
  respiration: 'Respiration (RPM)',
};

export const INTERVAL_TYPES = {
  default: ['60', '30', '15'],
  with3Min: ['60', '30', '15', '3'],
  with2Min: ['60', '30', '15', '2'],
};

export const INTERVAL_LABELS = {
  60: 'Hourly',
  30: '30 mins',
  15: '15 mins',
  3: '3 mins',
  2: '2 mins',
};

export const CHARTABLE_TYPES = [
  'heartRate',
  'stress',
  'bodyBatteryLevel',
  'spo2',
  'respiration',
];
export const RAW_SERIES_TYPES = [
  'stats',
  'fitnessAge',
  'activities',
  'moveiq',
  'epochs',
  'sleep',
];
