import Layout from '../components/commons/Layout';
import ProtectedPage from '../components/commons/ProtectedRoute';
import BirthdayList from '../components/list/BirthdayList';
import { BirthdayToolbar } from '../components/calendar/BirthdayToolbar';
import { PageListContextProvider } from '../contexts/PageListContext';
import { BirthdayModal } from 'components/commons/BirthdayModal';

export default function ListPage() {
  return (
    <PageListContextProvider>
      <ProtectedPage>
        <Layout currentSite="list">
          <BirthdayToolbar title="Birthday List" />
          <BirthdayList />
          <BirthdayModal />
        </Layout>
      </ProtectedPage>
    </PageListContextProvider>
  );
}
