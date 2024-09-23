import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { AppStateContextProvider } from './components/context/data-provider';
import HomePage from './pages/home/home-page';
import '@/styles/globals.css';
import { InformationPage } from './pages/information/information-page';
import { ReliabilityPage } from './pages/reliability/reliability-page';
import { ARCHIVES_LINK, INFORMATION_LINK, RELIABILITY_LINK } from './components/layout/views/header';
import HomePageArchiveListing, { loader as archiveListLoader } from './pages/archive/home-page-archive-list';
import HomePageArchived, { loader as archivedLoader } from './pages/archive/home-page-archived';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path={INFORMATION_LINK} element={<InformationPage />} />
      <Route path={RELIABILITY_LINK} element={<ReliabilityPage />} />
      <Route path={ARCHIVES_LINK} loader={archiveListLoader} element={<HomePageArchiveListing />} />
      <Route path={`${ARCHIVES_LINK}/:id`} loader={archivedLoader} element={<HomePageArchived />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AppStateContextProvider>
        <RouterProvider future={{ v7_startTransition: true }} router={router} />
      </AppStateContextProvider>
    </ThemeProvider>
  );
}

export default App;
