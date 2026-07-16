import { loadNftDetailById } from '../nftDetailService';
import { getNftById } from '@/actions';
import { loadNftsList } from '../allNftsService';

jest.mock('@/actions', () => ({
  getNftById: jest.fn(),
}));

jest.mock('../allNftsService', () => ({
  loadNftsList: jest.fn(),
}));

const mockedGetNftById = jest.mocked(getNftById);
const mockedLoadNftsList = jest.mocked(loadNftsList);

const nft = {
  id: 7,
  name: 'NFT 7',
  description: 'desc',
  image: 'img.png',
  price: '30',
  createdAt: '2024-01-01',
};

describe('nftDetailService', () => {
  it('retorna null quando o id nao e numerico', async () => {
    const result = await loadNftDetailById('abc');

    expect(result).toBeNull();
    expect(mockedLoadNftsList).not.toHaveBeenCalled();
  });

  it('carrega a lista e retorna o nft encontrado', async () => {
    mockedLoadNftsList.mockResolvedValueOnce({
      nfts: [nft],
      count: 1,
    });
    mockedGetNftById.mockResolvedValueOnce(nft);

    const result = await loadNftDetailById('7');

    expect(mockedLoadNftsList).toHaveBeenCalled();
    expect(mockedGetNftById).toHaveBeenCalledWith({ nfts: [nft], count: 1 }, 7);
    expect(result).toEqual(nft);
  });

  it('retorna null quando nao encontra o nft', async () => {
    mockedLoadNftsList.mockResolvedValueOnce({
      nfts: [],
      count: 0,
    });
    mockedGetNftById.mockResolvedValueOnce(undefined);

    const result = await loadNftDetailById('99');

    expect(result).toBeNull();
  });
});
