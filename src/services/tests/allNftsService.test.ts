import { getNextNftsPageParam, loadNftsList } from '../allNftsService';
import { getNftsList } from '@/actions';
import { ROWS_PER_PAGE, DEFAULT_SORT_BY, DEFAULT_ORDER_BY } from '@/config';

jest.mock('@/actions', () => ({
  getNftsList: jest.fn(),
}));

const mockedGetNftsList = jest.mocked(getNftsList);

const validResponse = {
  products: [
    {
      id: 1,
      name: 'NFT A',
      description: 'desc',
      image: 'img',
      price: '10',
      createdAt: '2024-01-01',
    },
  ],
  count: 1,
};

describe('allNftsService', () => {
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('calcula a proxima pagina quando ainda ha itens a carregar', () => {
    const result = getNextNftsPageParam(
      { nfts: [{ ...validResponse.products[0], id: 2 }], count: 3 },
      [
        { nfts: [validResponse.products[0]], count: 3 },
        { nfts: [{ ...validResponse.products[0], id: 2 }], count: 3 },
      ],
    );

    expect(result).toBe(3);
  });

  it('retorna undefined quando nao ha mais paginas', () => {
    const result = getNextNftsPageParam({ nfts: [validResponse.products[0]], count: 1 }, [
      { nfts: [validResponse.products[0]], count: 1 },
    ]);

    expect(result).toBeUndefined();
  });

  it('usa os parametros default na carga da lista', async () => {
    mockedGetNftsList.mockResolvedValueOnce(validResponse);

    const result = await loadNftsList();

    expect(mockedGetNftsList).toHaveBeenCalledWith({
      page: 1,
      rows: ROWS_PER_PAGE,
      sortBy: DEFAULT_SORT_BY,
      orderBy: DEFAULT_ORDER_BY,
    });
    expect(result).toEqual({
      nfts: validResponse.products,
      count: 1,
    });
  });

  it('retorna lista vazia quando a validacao falha', async () => {
    mockedGetNftsList.mockResolvedValueOnce({
      products: [{ id: 'errado' }],
      count: 'x',
    } as never);

    const result = await loadNftsList();

    expect(result).toEqual({
      nfts: [],
      count: 0,
    });
  });

  it('retorna lista vazia quando a action falha', async () => {
    mockedGetNftsList.mockRejectedValueOnce(new Error('falhou'));

    const result = await loadNftsList({
      page: 3,
      rows: 12,
      sortBy: 'price',
      orderBy: 'ASC',
    });

    expect(result).toEqual({
      nfts: [],
      count: 0,
    });
  });
});
