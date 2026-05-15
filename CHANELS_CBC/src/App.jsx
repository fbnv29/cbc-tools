import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChannelsProvider } from './context/ChannelsContext';
import Navbar from './components/Navbar';
import PublicView from './pages/PublicView';
import AdminDashboard from './pages/AdminDashboard';
import './styles/global.css';

function App() {
  return (
    <ChannelsProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<PublicView />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} StudioLive Monitor System — DONDE ME CONECTO V2</p>
          </footer>
        </div>
      </Router>
    </ChannelsProvider>
  );
}

export default App;
