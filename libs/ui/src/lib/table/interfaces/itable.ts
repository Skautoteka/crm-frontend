export type TableSource<T> = ITableSourceEntity<T>[];

export type ITableSourceEntity<T> = {
  id: number;
} & T;

export type TableDefinition = TableDefinitionEntry[];

export interface TableDefinitionEntry {
  name: string;
  width: string;
}
