import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { AppStateContextProvider } from './components/context/data-provider';
import HomePage from './pages/home/home-page';
import '@/styles/globals.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
    </Route>
  )
);

/*
      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/documentation" element={<DocumentationListingPage />} />
      <Route path="/documentation/:slug" element={<DocumentationEntryPage />} />

      <Route path="/session/:Group" element={<ClientsPage />} />
      <Route path="/session/:Group/:Individual" element={<EvaluationsPage />} />
      <Route path="/session/:Group/:Individual/keysets" element={<KeySetsPage />} />
      <Route path="/session/:Group/:Individual/keysets/:KeySet" element={<KeySetEditor />} />
      <Route path="/session/:Group/:Individual/:Evaluation" element={<SessionDesignerShim />} />
      <Route path="/session/:Group/:Individual/:Evaluation/history" element={<DashboardHistoryPageShim />} />
      <Route path="/session/:Group/:Individual/:Evaluation/history/:Index" element={<SessionViewerPageShim />} />
      <Route path="/session/:Group/:Individual/:Evaluation/proportion" element={<ResultsProportionVisualsPageShim />} />
      <Route path="/session/:Group/:Individual/:Evaluation/rate" element={<ResultsRateVisualsPageShim />} />
      <Route path="/session/:Group/:Individual/:Evaluation/reli" element={<ReliabilityViewerPageShim />} />
      <Route path="/session/:Group/:Individual/:Evaluation/run" element={<SessionRecorderPageShim />} />
      <Route path="/session/:Group/:Individual/:Evaluation/view" element={<ResultsViewerPageShim />} />

      <Route path="/settings" element={<SettingsPage />} />
*/

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
