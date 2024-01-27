import "./App.css";
import "./index.css";
import React from "react";
// import Notifications from "./notification";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer";
import SendMailNodemailer from "./components/Nodemailer";


function App() {
  return (
    <div>
      <h1>hi</h1>
      <SendMailNodemailer />
      {/* <Router>
        <Routes>
          <Route path="/" element={sendMailNodemailer} />
        </Routes>
        <Footer />
      </Router> */}
    </div>
  );
}

export default App;
