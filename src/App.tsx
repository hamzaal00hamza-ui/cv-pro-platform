import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import CreateCV from "./pages/CreateCV";
import Payment from "./pages/Payment";
import Preview from "./pages/Preview";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-cv" element={<CreateCV />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
