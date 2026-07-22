import { Page } from '@strapi/strapi/admin';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DesignSystemProvider } from '@strapi/design-system';

import { HomePage } from './HomePage';
import Dashboard from './dashboard/Dashboard';
import RootPage from '../layout/RootLayout';
import Projects from './projects/Projects';
import Tasks from './tasks/Tasks';
const App = () => {
  return (
    <DesignSystemProvider>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>

        <Route path="*" element={<Page.Error />} />
      </Routes>
    </DesignSystemProvider>
  );
};

export default App;
