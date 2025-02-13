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
        title: 'All User',
        path: '/users/all-users',
        icon: 'USER',
      },
    ],
  },
  {
    id: 4,
    title: 'All Machine List',
    path: '/machines-list',
    icon: 'MACHINE',
    children: [],
  },
  {
    id: 43,
    title: 'Payout Report',
    path: '/payout-report',
    icon: 'PAYMENT',
    children: [],
  },
  {
    id: 5,
    title: 'All Transaction',
    path: '/all-transaction',
    icon: 'TRANSACTION',
    children: [],
  },
  // {
  //   id: 6,
  //   title: 'Distributor',
  //   path: '/distributor',
  //   icon: 'USER',
  //   children: [
  //     {
  //       id: 7,
  //       title: 'Add Distributor',
  //       path: '/distributor/add-distributor',
  //       icon: 'USER',
  //     },
  //     {
  //       id: 8,
  //       title: 'Distributor List',
  //       path: '/distributor/distributor-list',
  //       icon: 'USER',
  //     },
  //   ],
  // },
  {
    id: 9,
    title: 'Machine Master',
    path: '/machine',
    icon: 'RIMASTERCARDLINE',
    children: [
      {
        id: 10,
        title: 'Add Machine',
        path: '/Machine/add-machine',
        icon: 'USER',
      },
      {
        id: 11,
        title: 'Machine List',
        path: '/Machine/machine-list',
        icon: 'USER',
      },
    ],
  },
  {
    id: 12,
    title: 'Machine Registration',
    path: '/machine',
    icon: 'MDAPPREGISTRASION',
    children: [
      {
        id: 13,
        title: 'Machine Registration',
        path: '/Machine/registration',
        icon: 'USER',
      },
      {
        id: 14,
        title: 'FreeMachine List',
        path: '/Machine/free-machine-list',
        icon: 'USER',
      },
      {
        id: 15,
        title: 'Occupied Machine List',
        path: '/Machine/occupied-machine-list',
        icon: 'USER',
      },
    ],
  },
  {
    id: 16,
    title: 'Franchise',
    path: '/franchise',
    icon: 'MDOUTLINEAREACHART',
    children: [
      {
        id: 17,
        title: 'Add Franchise',
        path: '/franchise/add-franchise',
        icon: 'USER',
      },
      {
        id: 18,
        title: 'Franchise Details',
        path: '/franchise/franchise-details',
        icon: 'USER',
      },
      {
        id: 19,
        title: 'Franchise Purchase',
        path: '/franchise/franchise-purchase',
        icon: 'USER',
      },
      {
        id: 20,
        title: 'Paid Payout',
        path: '/franchise/paid-payout',
        icon: 'USER',
      },
      {
        id: 21,
        title: 'Pending Payout',
        path: '/franchise/pending-payout',
        icon: 'USER',
      },
      {
        id: 22,
        title: 'Pending Stock',
        path: '/franchise/pending-stock',
        icon: 'USER',
      },
      {
        id: 23,
        title: 'Repurchase Order',
        path: '/franchise/repurchase-order',
        icon: 'USER',
      },
      {
        id: 24,
        title: 'Sale Product',
        path: '/franchise/sale-product',
        icon: 'USER',
      },
      {
        id: 25,
        title: 'Withdrawal Approved ',
        path: '/franchise/withdrawal-approved',
        icon: 'USER',
      },
      {
        id: 26,
        title: 'Withdrawal Pending ',
        path: '/franchise/withdrawal-pending',
        icon: 'USER',
      },
    ],
  },
  {
    id: 27,
    title: 'Coin Master',
    path: '/coin',
    icon: 'Coins',
    children: [
      {
        id: 28,
        title: 'Add Coin',
        path: '/coin/add-coin',
        icon: 'USER',
      },
      {
        id: 29,
        title: 'Coin List',
        path: '/coin/coin-list',
        icon: 'USER',
      },
    ],
  },
  {
    id: 30,
    title: 'Adjust Rewards',
    path: '/rewards/adjust-rewards',
    icon: 'TIGHTROPE',
    children: [],
  },
  // {
  //   id: 31,
  //   title: 'Reset Earnings',
  //   path: '/Earnings/Reset-earnings',
  //   icon: 'DOLLAR',
  //   children: [],
  // },
  // {
  //   id: 32,
  //   title: 'Reward',
  //   path: '/reward/rewards',
  //   icon: 'REWARDS',
  //   children: [],
  // },
  // add buttons here
  {
    id: 33,
    title: 'Prepare payout',
    path: '/prepare-payout',
    icon: 'PREPAREPAY',
    children: [],
  },
  {
    id: 34,
    title: 'Create/Submit payout',
    path: '/submit-payout',
    icon: 'PAYOUT',
    children: [],
  },
  {
    id: 35,
    title: 'Support',
    path: '/support',
    icon: 'MDOUTLINESUPPORT',
    children: [
      // {
      //   id: 36,
      //   title: 'Approved',
      //   path: '/support/approved',
      //   icon: 'USER',
      // },
      {
        id: 37,
        title: 'Support',
        path: '/support',
        icon: 'MDOUTLINESUPPORT',
      },
    ],
  },
  {
    id: 38,
    title: 'Setting',
    path: '/setting',
    icon: 'IOSETTINGS',
    children: [
      {
        id: 39,
        title: 'General settings',
        path: '/setting/general-setting',
        icon: 'USER',
      },
      // {
      //   id: 40,
      //   title: 'Database Backup',
      //   path: '/setting/back-up-setting',
      //   icon: 'USER',
      // },
    ],
  },
  {
    id: 41,
    title: 'Change Password',
    path: '/password/change-password',
    icon: 'MDOUTLINEPASSWORD',
    children: [],
  },
  {
    id: 42,
    title: 'Logout',
    path: '#',
    icon: 'CILOGOUT',
    children: [],
  },
];
