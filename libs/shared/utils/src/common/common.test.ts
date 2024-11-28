import { cleanSearchParams, cn } from './common';

describe('cn', () => {
  it('should merge classnames', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('should merge classnames with empty strings', () => {
    expect(cn('', 'a', '', 'b', '', 'c', '')).toBe('a b c');
  });

  it('should merge classnames with numbers', () => {
    expect(cn('a', 1, 'b', 2, 'c', 3)).toBe('a 1 b 2 c 3');
  });

  it('should merge classnames with boolean values', () => {
    expect(cn('a', true, 'b', false, 'c')).toBe('a b c');
  });

  it('should merge classnames with null and undefined values', () => {
    expect(cn('a', null, 'b', undefined, 'c')).toBe('a b c');
  });

  it('should merge classnames with conditional values', () => {
    expect(cn('a', true && 'b', false && 'c')).toBe('a b');
  });
});

describe('cleanSearchParams', () => {
  it('should remove null values', () => {
    expect(cleanSearchParams({ a: '1', b: null, c: '3' })).toEqual({
      a: '1',
      b: undefined,
      c: '3',
    });
  });

  it('should remove empty string values', () => {
    expect(cleanSearchParams({ a: '1', b: '', c: '3' })).toEqual({
      a: '1',
      b: undefined,
      c: '3',
    });
  });

  it('should keep non-empty values', () => {
    expect(cleanSearchParams({ a: '1', b: '2', c: '3' })).toEqual({
      a: '1',
      b: '2',
      c: '3',
    });
  });

  it('should handle mixed null and empty string values', () => {
    expect(cleanSearchParams({ a: null, b: '', c: '3' })).toEqual({
      a: undefined,
      b: undefined,
      c: '3',
    });
  });

  it('should handle all null and empty string values', () => {
    expect(cleanSearchParams({ a: null, b: '', c: null })).toEqual({
      a: undefined,
      b: undefined,
      c: undefined,
    });
  });

  it('should handle an empty object', () => {
    expect(cleanSearchParams({})).toEqual({});
  });

  it('should handle values that are not null or empty strings', () => {
    expect(cleanSearchParams({ a: '1', b: 0, c: false, d: [], e: {} })).toEqual(
      { a: '1', b: 0, c: false, d: [], e: {} },
    );
  });
});
