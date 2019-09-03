import { BodyTagSanitizerPipe } from './body-tag-sanitizer.pipe';

describe('BodyTagSanitizerPipe', () => {
  it('create an instance', () => {
    const pipe = new BodyTagSanitizerPipe();
    expect(pipe).toBeTruthy();
  });
});
