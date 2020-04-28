require('jest-similar');

describe('array similarity test', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains same elements but different order', () => {
    expect(['Bob', 'Alice']).toBeSimilar(expected);
  });
  it('does not matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).not.toBeSimilar(expected);
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toBeSimilar(expected);
  });
});

describe('object similarity test', () => {
  const expected = {'a':'Alice', 'b':'Bob'};
  it('matches even if received contains same elements but different order', () => {
    expect({'b':'Bob', 'a':'Alice'}).toBeSimilar(expected);
  });
  it('does not matches even if received contains additional elements', () => {
    expect({'a':'Alice', 'b':'Bob', 'c':'Eve'}).not.toBeSimilar(expected);
  });
  it('does not match if received does not contain expected elements', () => {
    expect({'a':'Bob', 'b':'Eve'}).not.toBeSimilar(expected);
  });
});

describe('nested array in object similarity test', () => {
  const expected = {'a':['Alice', 'Bob'], 'b':['Alice', 'Bob', 'Eve']};
  it('matches even if received contains same elements but different order', () => {
    expect({'b':['Bob', 'Eve', 'Alice'], 'a':['Bob', 'Alice']}).toBeSimilar(expected);
  });
  it('does not matches even if received contains additional elements', () => {
    expect({'a':['Alice', 'Bob', 'Eve'], 'b':['Alice', 'Bob', 'Eve']}).not.toBeSimilar(expected);
  });
  it('does not match if received does not contain expected elements', () => {
    expect({'a':['Bob'], 'b':['Eve']}).not.toBeSimilar(expected);
  });
});
