import { helper } from '@ember/component/helper';

export default helper(function formatMinHours([seconds]) {
  if (seconds == null || seconds === 0) {
    return '-';
  }

  const minutes = Math.floor(seconds / 60);
  const hh = Math.floor(minutes / 60);
  const mm = String(minutes % 60).padStart(2, '0');

  return `${minutes} min (${hh}:${mm}h)`;
});
