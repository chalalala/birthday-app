import React from 'react'
import BirthdayList from '../components/BirthdayList'
import ProtectedPage from '../components/ProtectedRoute'
import Layout from '../components/Layout'
import CsvReader from '../components/CsvReader'

export default function ListPage() {
  return (
      <ProtectedPage>
        <Layout currentSite="list">
          <CsvReader />
          <BirthdayList />
        </Layout>
      </ProtectedPage>
  )
}
