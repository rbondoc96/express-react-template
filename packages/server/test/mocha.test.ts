import SrcClass from '@/SrcClass';
import MockClass from '@mocks/MockClass';
import {expect} from 'chai';

describe('Test Suite', () => {
  it('My First Test Case', () => {
    const src = new SrcClass();
    const mock = new MockClass();

    expect(src.bar()).to.equal('bar');
    expect(mock.mock()).to.equal('mock');
  });
});
