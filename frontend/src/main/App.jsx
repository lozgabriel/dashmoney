import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../dashboard/Dashboard';
import BillingCycle from '../billingCycle/BillingCycle';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main className="wrapper">
      <Header />
      <section className="main-content">
      <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/billingCycle" element={<BillingCycle />} />
        </Routes>
      </section>
      <ToastContainer />
    </main>
  );
}

export default App;
