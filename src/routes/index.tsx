import Button from "@mui/material/Button"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAppThemeContext } from "../shared/contexts"

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext()
  return (
    <Routes>
      <Route path="/dashboard" element={<Button variant="contained" color="primary" onClick={toggleTheme}>Ola mundo</Button>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>

  )
}