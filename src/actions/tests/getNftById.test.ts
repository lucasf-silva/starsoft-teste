import { getNftById } from '../getNftById';
import { getNftsList } from '../nftsAll';

jest.mock('../nftsAll', () => ({
  getNftsList: jest.fn(),
}));

const mockedGetNftsList = jest.mocked(getNftsList);

const nftA = {
  id: 1,
  name: 'NFT A',
  description: 'desc a',
  image: 'a.png',
  price: '10',
  createdAt: '2024-01-01',
};

const nftB = {
  id: 2,
  name: 'NFT B',
  description: 'desc b',
  image: 'b.png',
  price: '20',
  createdAt: '2024-01-02',
};

describe('getNftById', () => {
  it('retorna o nft quando ele ja existe na lista em cache', async () => {
    const result = await getNftById(
      {
        nfts: [nftA, nftB],
        count: 2,
      },
      2,
    );

    expect(result).toEqual(nftB);
    expect(mockedGetNftsList).not.toHaveBeenCalled();
  });

  it('procura em pages de infinite query antes do fallback', async () => {
    const result = await getNftById(
      {
        pages: [
          { nfts: [nftA], count: 2 },
          { nfts: [nftB], count: 2 },
        ],
        pageParams: [1, 2],
      },
      1,
    );

    expect(result).toEqual(nftA);
    expect(mockedGetNftsList).not.toHaveBeenCalled();
  });

  it('faz fallback para a api quando nao encontra no cache', async () => {
    mockedGetNftsList.mockResolvedValueOnce({
      products: [nftB],
      count: 1,
    });

    const result = await getNftById(
      {
        nfts: [nftA],
        count: 2,
      },
      2,
    );

    expect(mockedGetNftsList).toHaveBeenCalledWith({
      page: 1,
      rows: 50,
      sortBy: 'id',
      orderBy: 'DESC',
    });
    expect(result).toEqual(nftB);
  });

  it('retorna undefined quando nao encontra nem no cache nem na api', async () => {
    mockedGetNftsList.mockResolvedValueOnce({
      products: [],
      count: 0,
    });

    const result = await getNftById(
      {
        nfts: [],
        count: 0,
      },
      999,
    );

    expect(result).toBeUndefined();
  });
});
