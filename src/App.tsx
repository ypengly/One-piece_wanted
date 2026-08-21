import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SupportPage from "./pages/SupportPage";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-board)]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}
