import { getObj } from '../cast.helper';

describe('cast', () => {
    it("returns the right type", async (done) => {
        const result = getObj({value: 2} as unknown as number);
        expect(result).toBeInstanceOf(Object);
        done();
    })
})

afterAll(async (done) => {
    done();
  });