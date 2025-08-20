import { helper } from '@ember/component/helper';

export default helper(function formatNumber(
  [value],
  { decimals = 1, trimIntegers = true } = {},
) {
  if (value == null || value === '') return '–';

  const num = Number(value);
  if (Number.isNaN(num)) return '–';

  if (trimIntegers && Number.isInteger(num)) {
    return String(num);
  }

  return num.toFixed(decimals);
});
