import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EtusivuNakyma from './components/Etusivu/EtusivuNakyma';
import AdminNakyma from './components/Admin/AdminNakyma';
import ElokuvanOmaNakyma, {
  leffaLoader,
} from './components/Elokuvasivu/ElokuvanOmaNakyma';
import Virhesivu from './components/Yleiset/Virhesivu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Virhesivu />,
    children: [
      {
        path: '',
        element: <EtusivuNakyma />,
      },

      {
        path: '/admin',
        element: <AdminNakyma />,
      },

      {
        path: '/leffat/:leffanId',
        element: <ElokuvanOmaNakyma />,
        loader: leffaLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
