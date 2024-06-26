import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const Products = Loadable(lazy(() => import('pages/extra-pages/Products')));
const BrandAndCategory = Loadable(lazy(() => import('pages/extra-pages/BrandsAndCategory')));
const TypeAndColour = Loadable(lazy(() => import('pages/extra-pages/TypeAndColour')));
const AddNewOrder = Loadable(lazy(() => import('pages/extra-pages/AddNewOrder')));
const Orders = Loadable(lazy(() => import('pages/extra-pages/Orders')));
const Customer = Loadable(lazy(() => import('pages/extra-pages/Customers')));
const Users = Loadable(lazy(() => import('pages/extra-pages/Users')));
const Stocks = Loadable(lazy(() => import('pages/extra-pages/Stocks')));
const Scanner = Loadable(lazy(() => import('pages/extra-pages/Scan')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'typeandcolour',
      element: <TypeAndColour />
    },
    {
      path: 'brandandcategory',
      element: <BrandAndCategory />
    },
    {
      path: 'neworder',
      element: <AddNewOrder />
    },
    {
      path: 'orders',
      element: <Orders />
    },
    {
      path: 'stocks',
      element: <Stocks />
    },
    {
      path: 'customers',
      element: <Customer />
    },
    {
      path: 'scan',
      element: <Scanner />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
