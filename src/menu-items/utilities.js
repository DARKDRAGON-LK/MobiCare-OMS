// assets
import { AppstoreAddOutlined, AntDesignOutlined, BarcodeOutlined, DropboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';

// icons
const icons = {
  PlusOutlined,
  DropboxOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'sales',
  title: 'Sales',
  type: 'group',
  children: [
    {
      id: 'add-new-order',
      title: 'Add New Order',
      type: 'item',
      url: '/neworder',
      icon: icons.PlusOutlined
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.DropboxOutlined
    },
    {
      id: 'scanner',
      title: 'Scanner',
      type: 'item',
      url: '/scan',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'stocks',
      title: 'Stocks',
      type: 'item',
      url: '/stocks',
      icon: icons.AntDesignOutlined,
      breadcrumbs: false
    }
  ]
};

export default utilities;
