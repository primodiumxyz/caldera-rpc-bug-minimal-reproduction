import { useComponentValue } from '@latticexyz/react';
import { useMUD } from './MUDContext';
import { singletonEntity } from '@latticexyz/store-sync/recs';
import { useEffect, useState } from 'react';
import { getLogs } from 'viem/actions';

export const App = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
    network: { publicClient },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  const [eventWatcherLogsCount, seteventWatcherLogsCount] = useState(0);
  const [blockWatcherLogsCount, setblockWatcherLogsCount] = useState(0);

  useEffect(() => {
    // Subscribe to events emitted by the RPC
    // Whenever it receives some logs, increment the event watcher logs count
    const unsubEvent = publicClient.watchEvent({
      onLogs: (logs) => {
        seteventWatcherLogsCount((prev) => prev + 1);
        console.log(`Received event with ${logs.length} logs`);
      },
    });

    // Subscribe to all incoming blocks
    // Whenever there are some logs inside one, increment the block watcher logs count
    const unsubBlock = publicClient.watchBlocks({
      onBlock: async (block) => {
        getLogs(publicClient, { blockHash: block.hash }).then((logs) => {
          if (logs.length) {
            setblockWatcherLogsCount((prev) => prev + 1);
            console.log(`Received block with ${logs.length} logs`);
          }
        });
      },
    });

    return () => {
      unsubEvent();
      unsubBlock();
    };
  }, [publicClient]);

  // Log the event and block watcher logs count whenever they change
  // (They should be equal, but they aren't because of the bug)
  useEffect(() => {
    console.log({ eventWatcherLogsCount, blockWatcherLogsCount });
  }, [eventWatcherLogsCount, blockWatcherLogsCount]);

  // Increment the counter every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      increment();
    }, 10_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        Counter: <span>{counter?.value ?? '??'}</span>
      </div>
      <button
        type='button'
        onClick={async (event) => {
          event.preventDefault();
          await increment();
        }}
      >
        Increment
      </button>
    </>
  );
};
