import { helper } from '@ember/component/helper';

export default helper(function convertSeconds([seconds]) {
  return (seconds / 60).toFixed(2);
});
