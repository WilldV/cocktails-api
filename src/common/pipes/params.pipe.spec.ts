import { ParamsPipe } from './params.pipe';

describe('ParamsPipe', () => {
  const pipe = new ParamsPipe();

  describe('formatRelations', () => {
    it('should return an array of strings if relations is a string or an array of strings', () => {
      expect(pipe.formatRelations('test')).toEqual(['test']);
      expect(pipe.formatRelations(['test'])).toEqual(['test']);
    });
  });

  describe('formatOrder', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should return a formmated object and call formatSingleOrder once if order field is a string', () => {
      const formatSingleOrder = jest.spyOn(pipe, 'formatSingleOrder');
      expect(pipe.formatOrder('test')).toEqual({ test: 'ASC' });
      expect(formatSingleOrder).toHaveBeenCalledTimes(1);
    });

    it('should return a formmated object and call formatSingleOrder as many times as order field array length', () => {
      const formatSingleOrder = jest.spyOn(pipe, 'formatSingleOrder');
      const order = ['test', 'test2'];
      expect(pipe.formatOrder(order)).toEqual({ test: 'ASC', test2: 'ASC' });
      expect(formatSingleOrder).toHaveBeenCalledTimes(order.length);
    });
  });

  describe('formatSingleOrder', () => {
    it('should return a formmated object', () => {
      expect(pipe.formatSingleOrder('test')).toEqual({ test: 'ASC' });
      expect(pipe.formatSingleOrder('test.nested')).toEqual({
        test: { nested: 'ASC' },
      });
    });
  });
});
