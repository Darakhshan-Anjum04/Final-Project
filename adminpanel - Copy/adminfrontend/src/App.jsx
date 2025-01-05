import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Admin from "./Admin";

export const backend_url = 'http://localhost:3000';
export const currency = '₹';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Admin />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App