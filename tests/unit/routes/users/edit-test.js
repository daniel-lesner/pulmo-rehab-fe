import { module, test } from 'qunit';
import { setupTest } from 'pulmo-rehab-fe/tests/helpers';

module('Unit | Route | users/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:users/edit');
    assert.ok(route);
  });
});
