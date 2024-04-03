// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'product',
  title: 'Products',
  type: 'group',
  children: [
    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.ChromeOutlined
    },
    {
      id: 'brandsandcategory',
      title: 'Product Brands & Categories',
      type: 'item',
      url: '/brandandcategory',
      icon: icons.ChromeOutlined
    },
    {
      id: 'typesandcolour',
      title: 'Product Types & Colours',
      type: 'item',
      url: '/typeandcolour',
      icon: icons.ChromeOutlined
    }
  ]
};

export default pages;
