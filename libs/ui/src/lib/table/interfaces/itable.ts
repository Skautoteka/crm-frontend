export type TableSource<T> = ITableSourceEntity<T>[];

export type ITableSourceEntity<T> = {
  id: string;
} & T;

export type TableDefinition = TableDefinitionEntry[];

export interface TableDefinitionEntry {
  name: string;
  width: string;
  hidden?: boolean;
}
