import { helper } from '@ember/component/helper';

export default helper(function convertSecondsToHours([seconds]) {
  return (seconds / 3600).toFixed(2);
});
