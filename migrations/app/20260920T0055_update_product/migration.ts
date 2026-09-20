#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/cadbe24b0914ffa57d34b22929f0ec897de92ba0977a61d174f6ad40139ecc58/contract';
import startContract from '../../snapshots/cadbe24b0914ffa57d34b22929f0ec897de92ba0977a61d174f6ad40139ecc58/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f7963153818894e0113d1d770627f8588e54f96de5d9a176b93f964d13b62e3e/contract';
import endContract from '../../snapshots/f7963153818894e0113d1d770627f8588e54f96de5d9a176b93f964d13b62e3e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('active', 'bool', {
          notNull: true,
          default: lit(true),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('stock', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-product-name', {
        check: () => placeholder('backfill-product-name:check'),
        run: () => placeholder('backfill-product-name:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'product', column: 'name' }),
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('priceCents', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-product-priceCents', {
        check: () => placeholder('backfill-product-priceCents:check'),
        run: () => placeholder('backfill-product-priceCents:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'product', column: 'priceCents' }),
      this.addUnique({
        schema: 'public',
        table: 'product',
        constraint: 'product_slug_key',
        columns: ['slug'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
