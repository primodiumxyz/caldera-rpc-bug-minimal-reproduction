/*
 * The supported chains.
 * By default, there are only two chains here:
 *
 * - mudFoundry, the chain running on anvil that pnpm dev
 *   starts by default. It is similar to the viem anvil chain
 *   (see https://viem.sh/docs/clients/test.html), but with the
 *   basefee set to zero to avoid transaction fees.
 * - Redstone, our production blockchain (https://redstone.xyz/)
 * - Garnet, our test blockchain (https://garnetchain.com/))
 *
 */

import {
  MUDChain,
  mudFoundry,
  redstone,
  garnet,
} from '@latticexyz/common/chains';

const calderaSepolia = {
  name: 'Caldera Sepolia',
  id: 10017,
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: {
    default: {
      http: ['https://primodium-sepolia.rpc.caldera.xyz/http'],
    },
    public: {
      http: ['https://primodium-sepolia.rpc.caldera.xyz/http'],
    },
  },
  faucetUrl: 'https://caldera-sepolia-faucet.primodium.ai/trpc',
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://primodium-sepolia.explorer.caldera.xyz/',
    },
  },
};

/*
 * See https://mud.dev/guides/hello-world/add-chain-client
 * for instructions on how to add networks.
 */
export const supportedChains: MUDChain[] = [
  mudFoundry,
  redstone,
  garnet,
  calderaSepolia,
];
