/**
 * @see https://github.com/angular/angular/blob/master/packages/zone.js/test/jest/zone-jsdom-environment.js
 */

const JsDOMEnvironment = require('jest-environment-jsdom');
const exportFakeTimersToSandboxGlobal = function (jestEnv) {
  jestEnv.global.legacyFakeTimers = jestEnv.fakeTimers;
  jestEnv.global.modernFakeTimers = jestEnv.fakeTimersModern;
};

class ZoneJsDOMEnvironment extends JsDOMEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    exportFakeTimersToSandboxGlobal(this);
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = ZoneJsDOMEnvironment;
