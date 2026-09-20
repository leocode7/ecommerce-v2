#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/93908fe678bd0cff74cc1f4b1d01e7746552c8134bdeea44c4e4c3f4c44a4208/contract';
import endContract from '../../snapshots/93908fe678bd0cff74cc1f4b1d01e7746552c8134bdeea44c4e4c3f4c44a4208/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f7963153818894e0113d1d770627f8588e54f96de5d9a176b93f964d13b62e3e/contract';
import startContract from '../../snapshots/f7963153818894e0113d1d770627f8588e54f96de5d9a176b93f964d13b62e3e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('teste', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dropNotNull({ schema: 'public', table: 'product', column: 'name' }),
      this.dropNotNull({ schema: 'public', table: 'product', column: 'priceCents' }),
      this.dropNotNull({ schema: 'public', table: 'product', column: 'slug' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
