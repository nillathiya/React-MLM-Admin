import { ICONS } from './icons';
export const MENU: {
  id: number;
  title: string;
  path: string;
  icon: keyof typeof ICONS;
  children: {
    id: number;
    title: string;
    path: string;
    icon: keyof typeof ICONS;
  }[];
}[] = [
  {
    id: 1,
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'DASHBOARD',
    children: [],
  },
  {
    id: 2,
    title: 'Users',
    path: '/users',
    icon: 'USER',
    children: [
      {
        id: 3,
        title: 'All Users',
        path: '/users/all-users',
        icon: 'USER',
      },
      {
        id: 3,
        title: 'Add Member',
        path: '/users/member',
        icon: 'USER',
      },
      {
        id: 3,
        title: 'User Reward',
        path: '/users/reward',
        icon: 'USER',
      },
    ],
  },

  {
    id: 2,
    title: 'Network',
    path: '/network',
    icon: 'NETWORK',
    children: [
      {
        id: 11,
        title: 'Generation Team',
        path: '/network/team',
        icon: 'DASHBOARD',
      },
    ],
  },
  {
    id: 2,
    title: 'Withdrawal',
    path: '/withdrawal',
    icon: 'WIDTHDRAWAL',
    children: [
      {
        id: 11,
        title: 'Pending',
        path: '/withdrawal/pending',
        icon: 'WIDTHDRAWAL',
      },
      {
        id: 12,
        title: 'Approved',
        path: '/withdrawal/approved',
        icon: 'WIDTHDRAWAL',
      },
      {
        id: 13,
        title: 'Cancelled',
        path: '/withdrawal/cancelled',
        icon: 'WIDTHDRAWAL',
      },
    ],
  },
  {
    id: 1,
    title: 'Orders',
    path: '/order',
    icon: 'ORDER',
    children: [],
  },
  {
    id: 1,
    title: 'Income',
    path: '/income',
    icon: 'INCOME',
    children: [],
  },
  {
    id: 2,
    title: 'Fund',
    path: '/fund',
    icon: 'FUND',
    children: [
      {
        id: 3,
        title: 'Add Fund',
        path: '/fund/add-fund',
        icon: 'FUND',
      },
      {
        id: 3,
        title: 'Fund Transfer History',
        path: '/fund/fund-transfer',
        icon: 'FUND',
      },
    ],
  },

  {
    id: 4,
    title: 'Support',
    path: '/support',
    icon: 'MDOUTLINESUPPORT',
    children: [
      {
        id: 5,
        title: 'Approved',
        path: '/support/approved',
        icon: 'USER',
      },
      {
        id: 6,
        title: 'pending',
        path: '/support/pending',
        icon: 'MDOUTLINESUPPORT',
      },
    ],
  },

  {
    id: 1,
    title: 'Contact Us',
    path: '/Contact',
    icon: 'CONTACTUs',
    children: [],
  },
  {
    id: 7,
    title: 'Setting',
    path: '/setting',
    icon: 'IOSETTINGS',
    children: [
      {
        id: 8,
        title: 'General settings',
        path: '/setting/general-setting',
        icon: 'USER',
      },
    ],
  },
  {
    id: 9,
    title: 'Change Password',
    path: '/password/change-password',
    icon: 'MDOUTLINEPASSWORD',
    children: [],
  },
  {
    id: 10,
    title: 'Logout',
    path: '#',
    icon: 'CILOGOUT',
    children: [],
  },
];
