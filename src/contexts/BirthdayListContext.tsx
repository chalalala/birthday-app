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
import { generateId } from 'utils/uid';

interface BirthdayListContextValue {
  // States
  birthdayList: IEntry[];
  searchQuery: string;

  // Actions
  setBirthdayList: React.Dispatch<React.SetStateAction<IEntry[]>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  addEntry: (addedRecords: IEntry | Array<IEntry>) => void;
  deleteEntry: (deletedRecords: IEntry | Array<IEntry>) => void;
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
    (addedRecords: IEntry | IEntry[]) => {
      const entries = Array.isArray(addedRecords)
        ? addedRecords
        : [addedRecords];
      const addedEntries = entries.map((event) => ({
        ...event,
        id: generateId(),
        dob: moment(event.dob).format('MM/DD/YYYY'),
      }));
      const newList = [...birthdayList, ...addedEntries];

      setBirthdayList(newList);
      uploadBirthdayList(newList, user);
    },
    [birthdayList, user],
  );

  const deleteEntry = useCallback(
    (deletedRecords: IEntry | Array<IEntry>) => {
      let newList = [...birthdayList];
      const entries = Array.isArray(deletedRecords)
        ? deletedRecords
        : [deletedRecords];
      entries.forEach((record) => {
        newList = newList.filter((entry, index) => entry.id !== record.id);
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
