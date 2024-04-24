import { IEntry } from './IEntry';

export const enum ModalType {
  ADD = 'Add',
  IMPORT = 'Import',
  UPDATE = 'Update',
  WARNING = 'WARNING',
}

export interface IModalState {
  show: boolean;
  type: ModalType | undefined;
  entry: IEntry | undefined;
}
