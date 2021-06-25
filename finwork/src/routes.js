import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import ProductList from 'src/pages/ProductDetail';
import Lastpage from 'src/pages/Lastpage';
import Detail from 'src/pages/Detail';
import Formp from 'src/pages/Formp';
import FormD from 'src/pages/FormD';
import FormD2 from 'src/pages/FormD2';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'Detail', element: <Detail /> },
      { path: 'form', element: <Formp /> },
      { path: 'Lastpage', element: <Lastpage /> },
      { path: 'FormD', element: <FormD /> },
      { path: 'FormD2', element: <FormD2 /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
