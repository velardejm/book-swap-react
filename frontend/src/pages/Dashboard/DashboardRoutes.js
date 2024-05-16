import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import MyBooks from "./MyBooks";
import SwapRequests from "./SwapRequests";
import SentRequests from "./SentRequests";


export default function DashboardRoutes() {
  return (
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<MyBooks />} />
          <Route path="mybooks" element={<MyBooks />} />
          <Route path="requests" element={<SwapRequests />} />
          <Route path="sent-requests" element={<SentRequests />} />
        </Route>
      </Routes>
  )
}