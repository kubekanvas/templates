import * as migration_20260716_092152_init from './20260716_092152_init';
import * as migration_20260716_100827_init from './20260716_100827_init';
import * as migration_20260716_114503_init from './20260716_114503_init';

export const migrations = [
  {
    up: migration_20260716_092152_init.up,
    down: migration_20260716_092152_init.down,
    name: '20260716_092152_init',
  },
  {
    up: migration_20260716_100827_init.up,
    down: migration_20260716_100827_init.down,
    name: '20260716_100827_init',
  },
  {
    up: migration_20260716_114503_init.up,
    down: migration_20260716_114503_init.down,
    name: '20260716_114503_init'
  },
];
