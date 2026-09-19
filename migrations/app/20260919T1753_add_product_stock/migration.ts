#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/c50124594e9d021ccf4f28f0876fa6a57d2aa8cc08eee164419ef8ea1bfedaad/contract';
import endContract from '../../snapshots/c50124594e9d021ccf4f28f0876fa6a57d2aa8cc08eee164419ef8ea1bfedaad/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/cadbe24b0914ffa57d34b22929f0ec897de92ba0977a61d174f6ad40139ecc58/contract';
import startContract from '../../snapshots/cadbe24b0914ffa57d34b22929f0ec897de92ba0977a61d174f6ad40139ecc58/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('stock', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
