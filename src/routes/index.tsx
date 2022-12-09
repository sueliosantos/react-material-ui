import Button from "@mui/material/Button"
import { Routes, Route, Navigate } from "react-router-dom"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Button variant="contained" color="primary">Ola mundo</Button>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>

  )
}