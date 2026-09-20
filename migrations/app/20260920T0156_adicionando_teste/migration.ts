#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/08cdb43ddac2dacca6fe1ddb09316486f2e07232f4f03b9598e45dfb09d24718/contract';
import endContract from '../../snapshots/08cdb43ddac2dacca6fe1ddb09316486f2e07232f4f03b9598e45dfb09d24718/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f7963153818894e0113d1d770627f8588e54f96de5d9a176b93f964d13b62e3e/contract';
import startContract from '../../snapshots/f7963153818894e0113d1d770627f8588e54f96de5d9a176b93f964d13b62e3e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

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
      this.dataTransform(endContract, 'backfill-product-teste', {
        check: () => placeholder('backfill-product-teste:check'),
        run: () => placeholder('backfill-product-teste:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'product', column: 'teste' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
