import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { SquadPage } from './pages/Squad';
import { TrackPage } from './pages/Track';
import { LibraryPage } from './pages/Library';
import { AccountPage } from './pages/Account';
import { MemoryProvider } from './contexts/MemoryContext';

const App: React.FC = () => {
  return (
    <MemoryProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/squad" element={<SquadPage />} />
            <Route path="/trilha-negocios" element={<TrackPage type="business" />} />
            <Route path="/trilha-tech" element={<TrackPage type="tech" />} />
            <Route path="/biblioteca" element={<LibraryPage />} />
            <Route path="/conta" element={<AccountPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </MemoryProvider>
  );
};

export default App;