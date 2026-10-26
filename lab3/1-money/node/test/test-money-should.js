import Money from '../src/money.js';
import { should } from 'chai';

should();

describe('Money (should)', function () {
  let m1;

  beforeEach(function () {
    m1 = new Money(10.0, 'EUR');
  });

  describe('#add()', function () {
    it('should correctly add two moneys with the same currency', function () {
      let m2 = new Money(20.0, 'EUR');

      m1.add(m2);

      m1.amount.should.equal(30.0);
    });

    it('should correctly add two moneys with different currencies', function () {
      let m2 = new Money(20.0, 'USD');

      m1.add(m2);

      m1.amount.should.equal(20.0);
    });

    it('should throw an exception when the currency is neither EUR nor USD', function () {
      let m2 = new Money(20.0, 'BRL');

      (() => m1.add(m2)).should.throw();
    });
  });
});
