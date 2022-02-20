import React from 'react'
import BirthdayList from '../components/BirthdayList'
import ProtectedPage from '../components/ProtectedRoute'
import Layout from '../components/Layout'
import BirthdayImporter from '../components/BirthdayImporter'

export default function ListPage() {
  return (
      <ProtectedPage>
        <Layout currentSite="list">
          <BirthdayImporter />
          <BirthdayList />
        </Layout>
      </ProtectedPage>
  )
}
