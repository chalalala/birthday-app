import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../utils/firebase';
import { useAuthState } from '../utils/auth';
import { IEntry } from '../types/IEntry';
import { uploadBirthdayList } from '../utils/birthdayList';
import moment from 'moment';
import { IEvent } from '../types/IEvent';
import { generateId } from 'utils/uid';

interface BirthdayListContextValue {
  // States
  birthdayList: IEntry[];
  searchQuery: string;

  // Actions
  setBirthdayList: React.Dispatch<React.SetStateAction<IEntry[]>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  addEntry: (addedRecords: Array<IEvent>) => void;
  deleteEntry: (deletedRecords: Array<IEvent>) => void;
  updateEntry: (currentEntry: IEntry, updatedEntry: IEntry) => void;
}

const BirthdayListContext = createContext<BirthdayListContextValue>(
  {} as never,
);

export const useBirthdayListContext = () => useContext(BirthdayListContext);

export const BirthdayListContextProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isAuthenticated, user } = useAuthState();
  const [birthdayList, setBirthdayList] = useState<IEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getBirthdayList = useCallback(async () => {
    if (!isAuthenticated) {
      return [];
    }

    const docRef = doc(db, user.email, 'birthday-list');
    const birthdayDoc = await getDoc(docRef);

    if (birthdayDoc.exists()) {
      setBirthdayList(birthdayDoc.data().birthdayList);
    }
  }, [isAuthenticated, user]);

  const addEntry = useCallback(
    (addedRecords: Array<IEvent>) => {
      const addedEntries: IEntry[] = addedRecords.map((event: IEvent) => ({
        id: generateId(),
        name: event.Subject,
        dob: moment(event.StartTime).format('MM/DD/YYYY'),
      }));
      const newList = [...birthdayList, ...addedEntries];

      setBirthdayList(newList);
      uploadBirthdayList(newList, user);
    },
    [birthdayList, user],
  );

  const deleteEntry = useCallback(
    (deletedRecords: Array<IEvent>) => {
      let newList = [...birthdayList];
      deletedRecords.forEach((record) => {
        newList = newList.filter((entry, index) => index !== record.Id);
      });

      setBirthdayList(newList);
      uploadBirthdayList(newList, user);
    },
    [birthdayList, user],
  );

  const updateEntry = useCallback(
    (currentEntry: IEntry, updatedEntry: IEntry) => {
      if (!currentEntry) {
        return;
      }

      const newList = [...birthdayList];
      newList.splice(birthdayList.indexOf(currentEntry), 1, updatedEntry);

      setBirthdayList(newList);
      uploadBirthdayList(newList, user);
    },
    [birthdayList, user],
  );

  useEffect(() => {
    getBirthdayList();
  }, [getBirthdayList]);

  const contextValue: BirthdayListContextValue = useMemo(
    () => ({
      // States
      birthdayList,
      searchQuery,

      // Actions
      setBirthdayList,
      setSearchQuery,
      addEntry,
      deleteEntry,
      updateEntry,
    }),
    [birthdayList, searchQuery, addEntry, deleteEntry, updateEntry],
  );

  return (
    <BirthdayListContext.Provider value={contextValue}>
      {children}
    </BirthdayListContext.Provider>
  );
};
