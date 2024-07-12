import './App.css';
import HomePage from './pages/HomePage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ListingDetailsPage from './pages/ListingDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = createRoutesFromElements(
  <Route path='/' element={<Outlet />} errorElement={<NotFoundPage />}>
    <Route path='' element={<HomePage />} />
    <Route path='/listings/:listingId' element={<ListingDetailsPage />} />
  </Route>,
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
