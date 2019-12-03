
import { incase, match, incaseVal, incaseTuple } from './index';
import * as fc from 'fast-check';
import { Arbitrary } from 'fast-check';

const getDataArb = <T>(baseArb: Arbitrary<T>) => fc.array(baseArb, 1, 100)
  .chain(patterns => {
    return fc.tuple(
      fc.constant(patterns),
      fc.nat(patterns.length - 1),
    );
  })
  .map(([ patterns, index ]) => {
    return [
      patterns,
      patterns[index],
      index,
    ] as const;
  });

test('matches to the first matching function', () => {
  fc.assert(
    fc.property(getDataArb(fc.nat()), ([ patterns, val ]) => {
      const caseAppliers = patterns.map((n: number, index) => {
        return incase(v => v === n)(() => index)
      });
      const index = match(val)(...caseAppliers);
      return patterns.indexOf(val) === index;
    })
  );
});

test('matches to the first matching value', () => {
  fc.assert(
    fc.property(getDataArb(fc.nat()), ([ patterns, val ]) => {
      const caseAppliers = patterns.map((n: number, index) => {
        return incaseVal(n)(() => index)
      });
      const index = match(val)(...caseAppliers);
      return patterns.indexOf(val) === index;
    })
  );
});

test('matches to the first matching tuple', () => {
  fc.assert(
    fc.property(getDataArb(fc.tuple(fc.nat(), fc.nat(), fc.nat())), ([ patterns, val ]) => {
      const caseAppliers = patterns.map((n: [number, number, number], index) => {
        return incaseTuple(n)(() => index)
      });
      const index = match(val)(...caseAppliers);
      return patterns.indexOf(val) === index;
    })
  );
});
