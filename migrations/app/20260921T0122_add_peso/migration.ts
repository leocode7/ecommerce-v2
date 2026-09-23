#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0bd971c6ec52ca83e4f2a95b1e1a32959f66ad067691b90c6f5d855755d96360/contract';
import startContract from '../../snapshots/0bd971c6ec52ca83e4f2a95b1e1a32959f66ad067691b90c6f5d855755d96360/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/e8db8bdb3da8ef79526df514c7c468dff10cd8ab3d16fac5df44c70b4f6e782e/contract';
import endContract from '../../snapshots/e8db8bdb3da8ef79526df514c7c468dff10cd8ab3d16fac5df44c70b4f6e782e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('peso', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
