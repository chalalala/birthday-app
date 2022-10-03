export interface IEntry {
  id: number;
  name: string;
  dob: Date | string;
  contact?: string;
}

export const entryFields = {
  name: 'Name',
  dob: 'DOB',
  contact: 'Contact',
};
