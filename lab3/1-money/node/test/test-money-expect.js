import Money from '../src/money.js';
import { expect } from 'chai';

describe('Money (expect)', function () {
  let m1;

  beforeEach(function () {
    m1 = new Money(10.0, 'EUR');
  });

  describe('#add()', function () {
    it('should correctly add two moneys with the same currency', function () {
      let m2 = new Money(20.0, 'EUR');

      m1.add(m2);

      expect(m1.amount).to.equal(30.0);
    });

    it('should correctly add two moneys with different currencies', function () {
      let m2 = new Money(20.0, 'USD');

      m1.add(m2);

      expect(m1.amount).to.equal(20.0);
    });

    it('should throw an exception when the currency is neither EUR nor USD', function () {
      let m2 = new Money(20.0, 'BRL');


      expect(() => m1.add(m2)).to.throw();
    });
  });
});
