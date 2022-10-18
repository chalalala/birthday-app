import React from 'react';
import BirthdayCalendar from '../components/BirthdayCalendar';
import Layout from '../components/commons/Layout';
import ProtectedPage from '../components/commons/ProtectedRoute';
import { UpcomingSection } from '../components/UpcomingSection';
import '../styles/pages/calendarPage.scss';

export default function CalendarPage() {
  return (
    <ProtectedPage>
      <Layout currentSite="calendar">
        <div className="calendar-page-container">
          <UpcomingSection />
          <BirthdayCalendar />
        </div>
      </Layout>
    </ProtectedPage>
  );
}
