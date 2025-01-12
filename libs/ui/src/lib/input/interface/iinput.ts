export type InputConfig = ISingleInputConfig[];

export interface ISingleInputConfig {
  name: string;
  placeholder: string;
  label: string;
  isRequired: boolean;
  type: InputType;
  isDisabled?: boolean;
  value?: any;
  options?: ISelectOption[];
  searchType?: string;
  valueTypes?: ISingleInputConfig[];
  min?: number;
  max?: number;
}

export interface ISelectOption {
  value: string;
  label: string;
}

type InputType = 'TEXT' | 'BOOL' | 'DATE' | 'SELECT' | 'SEARCH' | 'NUMBER' | 'DB' | 'MULTIVALUE' | 'TEXTAREA';
