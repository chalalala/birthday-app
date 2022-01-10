import React from 'react';
import Layout from '../components/Layout';
import CsvReader from '../components/CsvReader';
import BirthdayCalendar from "../components/BirthdayCalendar";

export default function CalendarPage() {
   return (
      <Layout currentSite="calendar">
         <CsvReader />
         <BirthdayCalendar />
      </Layout>
   )
}