# Caldera Sepolia RPC issue - minimal reproduction

## Overview

This reproduces the issue with events emitted by contracts deployed with [MUD](https://mud.dev).

The gist is that a viem `publicClient.watchEvents` listener won't always catch events, so it will miss some logs, that are actually present in the block. In fact, it will miss most of the logs, and only be triggered sporadically.

This started happening early this week/end of last week.

When creating multiple `publicClient.watchEvents` over the same client, it happens that one of them will be triggered while the others won't.

## Reproduction

The [./packages/client/src/App.tsx](App) contains the logic for the reproduction. It just creates both a `publicClient.watchEvents` and a `publicClient.watchBlocks` listener. The first one will increment whenever it receives an event, and the second one will increment whenever it receives a block that contains some logs. The increment function is called every 10 seconds (and you can call it manually on the page).

## How to run

### Run quickly

```sh
git clone git@github.com:primodiumxyz/caldera-rpc-bug-minimal-reproduction.git
pnpm i
cd packages/client && pnpm vite
```

Then visit: http://localhost:3000/?chainId=10017&worldAddress=0x9565c1406c82603df445b901a8e284c3b67b1d53&initialBlockNumber=11044578

### Deploy

If you would like to deploy on another chain:

1. [Add the chain to the config](./packages/client/src/mud/supportedChains.ts).
2. Add [the deploy command](./packages/contracts/package.json) as well as [the deployment profile](./packages/contracts/foundry.toml).
3. Update `PRIVATE_KEY` in [packages/contracts/.env](./packages/contracts/.env).
4. Run your deploy command.
5. Update the params in the URL (`chainId`, `worldAddress`, `initialBlockNumber`) to match the deployment (see in [worlds.json](./packages/contracts/worlds.json)).
