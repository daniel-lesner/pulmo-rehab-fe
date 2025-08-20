import { helper } from '@ember/component/helper';

export default helper(function formatTime([epochSeconds, offsetSeconds = 0]) {
  if (!epochSeconds && epochSeconds !== 0) return '—';

  const ms = (Number(epochSeconds) + Number(offsetSeconds || 0)) * 1000;
  const d = new Date(ms);
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');

  return `${hh}:${mm}`;
});
