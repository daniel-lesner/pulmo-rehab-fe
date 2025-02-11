import { helper } from '@ember/component/helper';

export default helper(function formatDatetime([timestamp, offset]) {
  let date = new Date((timestamp + offset) * 1000);

  debugger;

  return date.toISOString().replace('T', ' ').split('.')[0];
});
