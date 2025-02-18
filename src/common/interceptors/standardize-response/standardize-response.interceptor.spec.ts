import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CallHandler } from '@nestjs/common';
import { TestBed } from '@suites/unit';
import { firstValueFrom, of } from 'rxjs';
import { StandardizeResponseInterceptor } from './standardize-response.interceptor';

describe('StandardizeResponseInterceptor', () => {
  let underTest: StandardizeResponseInterceptor;

  beforeEach(async () => {
    const { unit } = await TestBed.solitary(
      StandardizeResponseInterceptor,
    ).compile();

    underTest = unit;
  });

  describe('intercept', () => {
    let next: DeepMocked<CallHandler<unknown>>;

    beforeEach(() => {
      next = createMock<CallHandler>({
        handle: jest.fn().mockReturnValue(of(void 0)),
      });
    });

    it.each([
      { desc: 'string', expected: 'string' },
      { desc: 'number', expected: 1 },
      { desc: 'boolean', expected: true },
      { desc: 'object', expected: { foo: 'bar' } },
      { desc: 'array', expected: [1, 2, 3] },
      { desc: 'empty object', expected: {} },
    ])(
      'should standardize the response of type $desc',
      async ({ expected }) => {
        next.handle.mockReturnValueOnce(of(expected));

        const actual = await firstValueFrom(
          underTest.intercept(createMock(), next),
        );

        expect(actual).toEqual({ data: expected });
      },
    );

    describe('when the response is already standardized', () => {
      it('should not standardize the response', async () => {
        const expected = { data: { foo: 'bar' } };

        next.handle.mockReturnValueOnce(of(expected));

        const actual = await firstValueFrom(
          underTest.intercept(createMock(), next),
        );

        expect(actual).toEqual(expected);
      });
    });

    describe.each([
      { desc: 'null', expected: null },
      { desc: 'undefined', expected: undefined },
    ])('when the response is $desc', ({ expected }) => {
      it('should return undefined', async () => {
        next.handle.mockReturnValueOnce(of(expected));

        const actual = await firstValueFrom(
          underTest.intercept(createMock(), next),
        );

        expect(actual).toBeUndefined();
      });
    });
  });
});
