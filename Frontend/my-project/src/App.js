import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";
import Register from "./Register";
import Books from "./Books";
import Punetori from "./Punetori";
import Bibloteka from "./Bibloteka";
import Libri from "./Libri";




export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="books" element={<Books />} />
          <Route path="punetori" element={<Punetori />} />
          <Route path="bibloteka" element={<Bibloteka />} />
          <Route path="libri" element={<Libri />} />
        </Routes>
      </Router>
    </div>
  );
}
