import React from 'react'
import BirthdayList from '../components/BirthdayList'
import ProtectedPage from '../components/ProtectedRoute'

export default function ListPage() {
  return (
      <ProtectedPage>
        <BirthdayList />
      </ProtectedPage>
  )
}
