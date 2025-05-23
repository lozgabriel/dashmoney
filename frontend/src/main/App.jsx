import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../dashboard/Dashboard';
import BillingCycle from '../billingCycle/BillingCycle';
import './App.css';

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
    </main>
  );
}

export default App;
