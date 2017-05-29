'use strict';

describe('Pushnotis E2E Tests:', function () {
  describe('Test Pushnotis page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/pushnotis');
      expect(element.all(by.repeater('pushnoti in pushnotis')).count()).toEqual(0);
    });
  });
});
