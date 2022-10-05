import React from 'react';
import BirthdayCalendar from '../components/BirthdayCalendar';
import Layout from '../components/commons/Layout';
import ProtectedPage from '../components/commons/ProtectedRoute';

export default function CalendarPage() {
  return (
    <ProtectedPage>
      <Layout currentSite="calendar">
        <BirthdayCalendar />
      </Layout>
    </ProtectedPage>
  );
}
