import { BirthdayModal } from 'components/BirthdayModal';
import { usePageListContext } from 'contexts/PageListContext';

export const ListModal = () => {
  const props = usePageListContext();

  return <BirthdayModal {...props} />;
};
