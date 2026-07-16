import { getNftsList } from '../nftsAll';
import { api } from '@/utils';

jest.mock('@/utils', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockedApiGet = jest.mocked(api.get);

describe('getNftsList', () => {
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('retorna a resposta da api quando a chamada funciona', async () => {
    mockedApiGet.mockResolvedValueOnce({
      products: [
        { id: 1, name: 'NFT', description: 'desc', image: 'img', price: '10', createdAt: '2024' },
      ],
      count: 1,
    });

    const result = await getNftsList({
      page: 1,
      rows: 8,
      sortBy: 'id',
      orderBy: 'DESC',
    });

    expect(mockedApiGet).toHaveBeenCalledWith('/products', {
      params: {
        page: 1,
        rows: 8,
        sortBy: 'id',
        orderBy: 'DESC',
      },
    });
    expect(result?.count).toBe(1);
  });

  it('retorna fallback vazio quando a api falha', async () => {
    mockedApiGet.mockRejectedValueOnce(new Error('falhou'));

    const result = await getNftsList();

    expect(result).toEqual({
      products: [],
      count: 0,
    });
  });
});
