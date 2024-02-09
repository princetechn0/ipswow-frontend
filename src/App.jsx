import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Presets from "./pages/Presets";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="presets" element={<Presets />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
