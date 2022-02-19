import React from 'react';
import CsvReader from './CsvReader';
import Layout from './Layout';

export default function BirthdayList() {
  return (
      <Layout currentSite="list">
         <CsvReader />
      </Layout>
  )
}
