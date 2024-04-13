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
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'ant-icons',
      title: 'Ant Icons',
      type: 'item',
      url: '/icons/ant',
      icon: icons.AntDesignOutlined,
      breadcrumbs: false
    }
  ]
};

export default utilities;
