import { Routes, Route } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"
import Test1 from "./Test1"
import Test2 from "./Test2"

export default function DashboardRoutes() {
  return (
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={null} />
          <Route path="1" element={<Test1 />} />
          <Route path="2" element={<Test2 />} />
        </Route>
      </Routes>
  )
}