require('jest-similar');

describe('similarity test', () => {
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
