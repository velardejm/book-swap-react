import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import MyBooks from "./MyBooks";
import SwapRequests from "./SwapRequests";

export default function DashboardRoutes() {
  return (
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<MyBooks />} />
          <Route path="mybooks" element={<MyBooks />} />
          <Route path="requests" element={<SwapRequests />} />
        </Route>
      </Routes>
  )
}