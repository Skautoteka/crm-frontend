export type InputConfig = ISingleInputConfig[];

export interface ISingleInputConfig {
  name: string;
  placeholder: string;
  label: string;
  isRequired: boolean;
  type: InputType;
}

type InputType = 'TEXT' | 'BOOL' | 'DATE';
