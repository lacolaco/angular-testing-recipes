/**
 * @see https://github.com/angular/angular/blob/master/packages/zone.js/test/jest/jest-zone.js
 */

const { legacyFakeTimers, modernFakeTimers } = global;

require('zone.js');
require('zone.js/testing');

if (Zone && Zone.patchJestObject) {
  Zone.patchJestObject(legacyFakeTimers);
  Zone.patchJestObject(modernFakeTimers);
}
