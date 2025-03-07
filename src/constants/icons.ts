import { FaHome, FaUser } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxDashboard } from 'react-icons/rx';
import { BiBarChart } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineContactPage } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { GrVirtualMachine } from 'react-icons/gr';
import { GrTransaction } from 'react-icons/gr';
import { RiMastercardLine } from 'react-icons/ri';
import { MdAppRegistration } from 'react-icons/md';
import { MdOutlineAreaChart } from 'react-icons/md';
import { MdOutlinePassword } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
import { MdOutlineSupport } from 'react-icons/md';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { RiWechatPayLine } from 'react-icons/ri';
import { IoTrophyOutline } from 'react-icons/io5';
import { FaCommentDollar } from 'react-icons/fa';
import { GiTightrope } from 'react-icons/gi';
import { FaCoins } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { LuDownload } from 'react-icons/lu';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { MdPayments } from 'react-icons/md';
import { MdPayment } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { GrMoney } from 'react-icons/gr';
import { RiFundsBoxLine } from 'react-icons/ri';
import { MdOutlineContactPhone } from 'react-icons/md';
import { MdNetworkCheck } from 'react-icons/md';

export const ICONS = {
  HOME: FaHome,
  PAYMENT: MdPayments,
  USER: FaUser,
  PREPAREPAY: MdPayment,
  SEARCH: AiOutlineSearch,
  DASHBOARD: RxDashboard,
  LOGO: BiBarChart,
  SETTING: IoSettingsOutline,
  CONTACT: MdOutlineContactPage,
  LOGOUT: CiLogout,
  MACHINE: GrVirtualMachine,
  TRANSACTION: GrTransaction,
  RIMASTERCARDLINE: RiMastercardLine,
  MDAPPREGISTRASION: MdAppRegistration,
  MDOUTLINEAREACHART: MdOutlineAreaChart,
  CILOGOUT: CiLogout,
  MDOUTLINEPASSWORD: MdOutlinePassword,
  IOSETTINGS: IoSettings,
  MDOUTLINESUPPORT: MdOutlineSupport,
  CREATE: MdOutlineCreateNewFolder,
  PAYOUT: RiWechatPayLine,
  REWARDS: IoTrophyOutline,
  DOLLAR: FaCommentDollar,
  TIGHTROPE: GiTightrope,
  Coins: FaCoins,
  CIEDIT: CiEdit,
  MAINBALANCE: MdAccountBalanceWallet,
  DOWNLOAD: LuDownload,
  EDITPAN: MdOutlineModeEditOutline,
  EYEOFF: IoMdEyeOff,
  EYE: IoMdEye,
  WIDTHDRAWAL: BiMoneyWithdraw,
  ORDER: AiOutlineOrderedList,
  INCOME: GrMoney,
  FUND: RiFundsBoxLine,
  CONTACTUs: MdOutlineContactPhone,
  NETWORK: MdNetworkCheck,
} as const;
