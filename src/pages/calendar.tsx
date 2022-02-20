import React from 'react';
import Layout from '../components/Layout';
import BirthdayImporter from '../components/BirthdayImporter';
import BirthdayCalendar from "../components/BirthdayCalendar";
import ProtectedPage from '../components/ProtectedRoute';

export default function CalendarPage() {
   return (
      <ProtectedPage>
         <Layout currentSite="calendar">
            <BirthdayCalendar />
         </Layout>
      </ProtectedPage>
   )
}