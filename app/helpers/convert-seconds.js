import { helper } from '@ember/component/helper';

export default helper(function convertSeconds([seconds]) {
  const s = Number(seconds || 0);

  if (s <= 0) return '—';
  const mins = Math.round(s / 60);

  return String(mins);
});
