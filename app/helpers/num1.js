import { helper } from '@ember/component/helper';

export default helper(function num1([value]) {
  if (value === null || value === undefined) return '—';

  const n = Number(value);
  if (Number.isNaN(n)) return value;

  return Number.isInteger(n) ? String(n) : n.toFixed(1);
});
