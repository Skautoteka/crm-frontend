export interface IPromptOptions {
  message: string;
  auxiliaryMessage: string;
  confirmInfo?: IPromptAction;
  cancelInfo?: IPromptAction;
}

interface IPromptAction {
  message: string;
  callback: (...args: unknown[]) => void;
}

export interface IPrompt {
  close: () => void;
}
