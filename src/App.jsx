import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeList from "./component/EmployeeList";
import EmployeeForm from "./component/EmployeeForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} />
      <Route path="/list" element={<EmployeeList />} />
      <Route path="/add" element={<EmployeeForm />} />
      <Route path="/edit/:id" element={<EmployeeForm />} />
    </Routes>
  );
}

export default App;