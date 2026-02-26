import dayjs from 'dayjs';
import { deepEqual } from '../utils';

describe('deepEqual', () => {
  // ─── Primitives ──────────────────────────────────────────────────────
  describe('primitives', () => {
    test('equal strings', () => {
      expect(deepEqual('hello', 'hello')).toBe(true);
    });

    test('unequal strings', () => {
      expect(deepEqual('hello', 'world')).toBe(false);
    });

    test('empty strings', () => {
      expect(deepEqual('', '')).toBe(true);
    });

    test('equal numbers', () => {
      expect(deepEqual(42, 42)).toBe(true);
    });

    test('unequal numbers', () => {
      expect(deepEqual(42, 43)).toBe(false);
    });

    test('zero and zero', () => {
      expect(deepEqual(0, 0)).toBe(true);
    });

    test('equal booleans', () => {
      expect(deepEqual(true, true)).toBe(true);
      expect(deepEqual(false, false)).toBe(true);
    });

    test('unequal booleans', () => {
      expect(deepEqual(true, false)).toBe(false);
    });

    test('null and null', () => {
      expect(deepEqual(null, null)).toBe(true);
    });

    test('undefined and undefined', () => {
      expect(deepEqual(undefined, undefined)).toBe(true);
    });

    test('NaN and NaN', () => {
      // Object.is(NaN, NaN) is true, so deepEqual should return true
      expect(deepEqual(NaN, NaN)).toBe(true);
    });

    test('+0 vs -0', () => {
      // Object.is(+0, -0) is false — this is intentional behavior
      expect(deepEqual(+0, -0)).toBe(false);
    });
  });

  // ─── Null / Undefined edge cases ────────────────────────────────────
  describe('null and undefined', () => {
    test('null vs undefined', () => {
      expect(deepEqual(null, undefined)).toBe(false);
    });

    test('null vs object', () => {
      expect(deepEqual(null, {})).toBe(false);
    });

    test('undefined vs object', () => {
      expect(deepEqual(undefined, {})).toBe(false);
    });

    test('null vs zero', () => {
      expect(deepEqual(null, 0)).toBe(false);
    });

    test('undefined vs empty string', () => {
      expect(deepEqual(undefined, '')).toBe(false);
    });
  });

  // ─── Plain objects ───────────────────────────────────────────────────
  describe('plain objects', () => {
    test('equal flat objects', () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    test('unequal flat objects', () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });

    test('different key counts', () => {
      expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    });

    test('empty objects', () => {
      expect(deepEqual({}, {})).toBe(true);
    });

    test('nested equal objects', () => {
      expect(
        deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })
      ).toBe(true);
    });

    test('nested unequal objects', () => {
      expect(
        deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })
      ).toBe(false);
    });

    test('different key order should still be equal', () => {
      expect(deepEqual({ a: 1, b: 2, c: 3 }, { c: 3, a: 1, b: 2 })).toBe(
        true
      );
    });

    test('{a: undefined} vs {} should NOT be equal', () => {
      // These have different key sets: one has key "a", the other does not
      expect(deepEqual({ a: undefined }, {})).toBe(false);
    });

    test('object with key present vs missing key', () => {
      expect(deepEqual({ a: 1, b: undefined }, { a: 1 })).toBe(false);
    });
  });

  // ─── Arrays ──────────────────────────────────────────────────────────
  describe('arrays', () => {
    test('equal flat arrays', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    test('unequal flat arrays', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    test('different length arrays', () => {
      expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    test('empty arrays', () => {
      expect(deepEqual([], [])).toBe(true);
    });

    test('nested equal arrays', () => {
      expect(deepEqual([[1, 2], [3, 4]], [[1, 2], [3, 4]])).toBe(true);
    });

    test('nested unequal arrays', () => {
      expect(deepEqual([[1, 2], [3, 4]], [[1, 2], [3, 5]])).toBe(false);
    });

    test('arrays with objects', () => {
      expect(deepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
      expect(deepEqual([{ a: 1 }], [{ a: 2 }])).toBe(false);
    });
  });

  // ─── Array vs Object ────────────────────────────────────────────────
  describe('array vs object', () => {
    test('array vs plain object', () => {
      expect(deepEqual([1, 2], { 0: 1, 1: 2 })).toBe(false);
    });

    test('empty array vs empty object', () => {
      expect(deepEqual([], {})).toBe(false);
    });
  });

  // ─── Date objects ────────────────────────────────────────────────────
  describe('Date objects', () => {
    test('equal dates', () => {
      const d1 = new Date(2024, 0, 1);
      const d2 = new Date(2024, 0, 1);
      expect(deepEqual(d1, d2)).toBe(true);
    });

    test('different dates', () => {
      const d1 = new Date(2024, 0, 1);
      const d2 = new Date(2024, 5, 15);
      expect(deepEqual(d1, d2)).toBe(false);
    });

    test('same timestamp dates', () => {
      const ts = 1704067200000;
      expect(deepEqual(new Date(ts), new Date(ts))).toBe(true);
    });
  });

  // ─── dayjs objects ───────────────────────────────────────────────────
  describe('dayjs objects', () => {
    test('equal dayjs dates', () => {
      const a = dayjs('2024-01-15');
      const b = dayjs('2024-01-15');
      // dayjs objects are plain objects internally; deepEqual compares by keys
      expect(deepEqual(a, b)).toBe(true);
    });

    test('different dayjs dates', () => {
      const a = dayjs('2024-01-15');
      const b = dayjs('2024-06-20');
      expect(deepEqual(a, b)).toBe(false);
    });
  });

  // ─── Functions ───────────────────────────────────────────────────────
  describe('functions', () => {
    test('same function reference is equal', () => {
      const fn = () => {};
      expect(deepEqual(fn, fn)).toBe(true);
    });

    test('different function references are not equal', () => {
      const fn1 = () => {};
      const fn2 = () => {};
      expect(deepEqual(fn1, fn2)).toBe(false);
    });
  });

  // ─── Mixed / cross-type comparisons ─────────────────────────────────
  describe('mixed types', () => {
    test('number vs string', () => {
      expect(deepEqual(1, '1')).toBe(false);
    });

    test('boolean vs number', () => {
      expect(deepEqual(true, 1)).toBe(false);
    });

    test('string vs object', () => {
      expect(deepEqual('hello', { value: 'hello' })).toBe(false);
    });

    test('number vs null', () => {
      expect(deepEqual(0, null)).toBe(false);
    });

    test('array vs string', () => {
      expect(deepEqual([1], '1')).toBe(false);
    });
  });

  // ─── Deeply nested structures ────────────────────────────────────────
  describe('deeply nested structures', () => {
    test('deeply nested equal objects', () => {
      const obj = {
        level1: {
          level2: {
            level3: {
              level4: {
                value: 'deep',
                arr: [1, { nested: true }],
              },
            },
          },
        },
      };

      const clone = {
        level1: {
          level2: {
            level3: {
              level4: {
                value: 'deep',
                arr: [1, { nested: true }],
              },
            },
          },
        },
      };

      expect(deepEqual(obj, clone)).toBe(true);
    });

    test('deeply nested unequal objects', () => {
      const a = {
        level1: { level2: { level3: { value: 'a' } } },
      };
      const b = {
        level1: { level2: { level3: { value: 'b' } } },
      };
      expect(deepEqual(a, b)).toBe(false);
    });

    test('complex mixed structure', () => {
      const structure = {
        users: [
          { name: 'Alice', scores: [100, 95, 88] },
          { name: 'Bob', scores: [90, 85, 92] },
        ],
        metadata: {
          count: 2,
          active: true,
        },
      };

      const identical = {
        users: [
          { name: 'Alice', scores: [100, 95, 88] },
          { name: 'Bob', scores: [90, 85, 92] },
        ],
        metadata: {
          count: 2,
          active: true,
        },
      };

      expect(deepEqual(structure, identical)).toBe(true);
    });

    test('complex mixed structure with one difference', () => {
      const a = {
        users: [
          { name: 'Alice', scores: [100, 95, 88] },
          { name: 'Bob', scores: [90, 85, 92] },
        ],
      };

      const b = {
        users: [
          { name: 'Alice', scores: [100, 95, 88] },
          { name: 'Bob', scores: [90, 85, 93] }, // last score differs
        ],
      };

      expect(deepEqual(a, b)).toBe(false);
    });
  });

  // ─── Same reference identity ─────────────────────────────────────────
  describe('reference identity', () => {
    test('same object reference', () => {
      const obj = { a: 1 };
      expect(deepEqual(obj, obj)).toBe(true);
    });

    test('same array reference', () => {
      const arr = [1, 2, 3];
      expect(deepEqual(arr, arr)).toBe(true);
    });
  });
});
