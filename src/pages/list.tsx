import Layout from '../components/commons/Layout';
import ProtectedPage from '../components/commons/ProtectedRoute';
import BirthdayList from '../components/BirthdayList';
import { BirthdayToolbar } from '../components/BirthdayToolbar';
import { PageListContextProvider } from '../contexts/PageListContext';
import { ListModal } from 'components/list/ListModal';

export default function ListPage() {
  return (
    <PageListContextProvider>
      <ProtectedPage>
        <Layout currentSite="list">
          <BirthdayToolbar title="Birthday List" />
          <BirthdayList />
          <ListModal />
        </Layout>
      </ProtectedPage>
    </PageListContextProvider>
  );
}
