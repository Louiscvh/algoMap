import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Room from '../pages/Room';
export default function Router() {
  return (
    <Routes>
        <Route path=":userName/:roomId" element={<Room />} />
    </Routes>
  )
}
