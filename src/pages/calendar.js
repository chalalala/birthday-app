import React from 'react';
import Layout from '../components/Layout';
import CsvReader from '../components/CsvReader';

export default function CalendarPage() {
   return (
      <Layout currentSite="calendar">
         <CsvReader />
      </Layout>
   )
}