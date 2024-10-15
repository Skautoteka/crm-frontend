export type InputConfig = ISingleInputConfig[];

export interface ISingleInputConfig {
  name: string;
  placeholder: string;
  label: string;
  isRequired: boolean;
  type: InputType;
  options?: ISelectOption[];
  searchType?: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}

type InputType = 'TEXT' | 'BOOL' | 'DATE' | 'SELECT' | 'SEARCH' | 'NUMBER';
