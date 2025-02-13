import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AllUsers from './pages/Users/AllUsers';
import AllMachineList from './pages/Machine/AllMachineList';
import Transaction from './pages/Transaction/Transaction';
import AddDistributor from './pages/Distributor/AddDistributor';
import DistributorList from './pages/Distributor/DistributorList';
import AddMachineMaster from './pages/MachineMaster/AddMachineMaster';
import Registration from './pages/MachineRegistration/Registration';
import OccupiedMachineList from './pages/MachineRegistration/OccupiedMachineList';
import FreeMachineList from './pages/MachineRegistration/FreeMachineList';
import AddFranchise from './pages/Franchise/AddFranchise';
import FranchiseDetails from './pages/Franchise/FranchiseDetails';
import FranchisePurchase from './pages/Franchise/FranchisePurchase';
import PaidPayout from './pages/Franchise/PaidPayout';
import PendingPayout from './pages/Franchise/PendingPayout';
import PendingStock from './pages/Franchise/PendingStock';
import RepurchaseOrder from './pages/Franchise/RepurchaseOrder';
import SaleProduct from './pages/Franchise/SaleProduct';
import WithdrawalApproved from './pages/Franchise/WithdrawalApproved';
import WithdrawalPending from './pages/Franchise/WithdrawalPending';
import AddCoin from './pages/Coin/AddCoin';
import CoinList from './pages/Coin/CoinList';
import AdjustRewards from './pages/AdjustRewards/AdjustReward';
import ResetEarning from './pages/Earning/ResetEarning';
import Rewards from './pages/Reward/Rewards';
import Approved from './pages/Support/Approved';
import Support from './pages/Support/Support';
import GeneralSetting from './pages/Settings/GeneralSetting';
import DataBaseBackUp from './pages/Settings/DataBaseBackUp';
import MachineList from './pages/MachineMaster/MachineList';
import EditUser from './pages/Users/EditUser';
import EditMachine from './pages/Machine/EditMachine';
import Login from './pages/Login/Login';
import ChangePassword from './pages/Password/ChangePassword';
import EditCoin from './pages/Coin/EditCoin';
import EditFreeMachine from './pages/MachineRegistration/EditFreeMachine';
import EditOccupiedMachine from './pages/MachineRegistration/EditOccupiedMachine';
import EditFranchise from './pages/Franchise/EditFranchise';
import FranchiseOrderView from './pages/Franchise/FranchiseOrderView';
import FranchisePendingView from './pages/Franchise/FranchisePendingView';
import FranchiserepurchaseView from './pages/Franchise/FranchiserepurchaseView';
import SupportView from './pages/Support/SupportView';
import RegistrationSetting from './pages/Settings/RegistrationSetting';
import InvestmentSetting from './pages/Settings/InvestmentSetting';
import WithdrawalSetting from './pages/Settings/WithdrawalSetting';
import FundSetting from './pages/Settings/FundSetting';
import ProfileSetting from './pages/Settings/ProfileSetting';
import DynamicpagesSetting from './pages/Settings/DynamicpagesSetting';
import ReInvestmentSetting from './pages/Settings/ReInvestmentSetting';
import AccountSetting from './pages/Settings/AccountSetting';
import RegisterWithOTPSetting from './pages/Settings/RegisterWithOTPSetting';
import BtcAddressOTPSetting from './pages/Settings/BtcAddressOTPSetting';
import BtcAddressWithOTPSetting from './pages/Settings/BtcAddressWithOTPSetting';
import LoginWithOTPSetting from './pages/Settings/LoginWithOTPSetting';
import PaymentMethodSetting from './pages/Settings/PaymentMethodSetting';
import PaymentMethodAcceptSetting from './pages/Settings/PaymentMethodAcceptSetting';
import CompanyInfoSetting from './pages/Settings/CompanyInfoSetting';
import PaymentMethodAcceptUpiSetting from './pages/Settings/PaymentMethodAcceptUpiSetting';
import PaymentMethodAcceptBankSetting from './pages/Settings/PaymentMethodAcceptBankSetting';
import PaymentMethodAcceptUsdtSetting from './pages/Settings/PaymentMethodAcceptUsdtSetting';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './features/auth/authSlice';
import UpdateMachine from './pages/MachineMaster/UpdateMachine';
import PreparePayout from './pages/PayoutReports/PreparePayout';
import SubmitPayout from './pages/PayoutReports/SubmitPayout';
import EditTransaction from './pages/Transaction/EditTransaction';
import PayOutReport from './pages/PayoutReports/PayOutReport';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader loader="ClipLoader" size={50} color="blue" fullPage={true} />
  ) : (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route element={<DefaultLayout children={undefined} />}>
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/users/all-users"
          element={
            <>
              <PageTitle title="Users" />
              <AllUsers />
            </>
          }
        />
        <Route
          path="/users/all-users/edituser/:id"
          element={
            <>
              <PageTitle title="Edit User" />
              <EditUser />
            </>
          }
        />
        <Route
          path="machines-list/edit-machine/:id"
          element={
            <>
              <PageTitle title="edit user" />
              <EditMachine />
            </>
          }
        />
        <Route
          path="machines-list/update-machine/:id"
          element={
            <>
              <PageTitle title="edit user" />
              <UpdateMachine />
            </>
          }
        />
        <Route
          path="/coin/coin-list/edit-coin/:id"
          element={
            <>
              <PageTitle title="edit user" />
              <EditCoin />
            </>
          }
        />

        {/* machines */}
        <Route
          path="/machines-list"
          element={
            <>
              <PageTitle title="Machine" />
              <AllMachineList />
            </>
          }
        />
        <Route
          path="/prepare-payout"
          element={
            <>
              <PageTitle title="Payout Report" />
              <PreparePayout />
            </>
          }
        />
        <Route
          path="/payout-report"
          element={
            <>
              <PageTitle title="Payout Report" />
              <PayOutReport />
            </>
          }
        />
        <Route
          path="/submit-payout"
          element={
            <>
              <PageTitle title="submit payout" />
              <SubmitPayout />
            </>
          }
        />
        <Route
          path="/all-transaction"
          element={
            <>
              <PageTitle title="All Transaction" />
              <Transaction />
            </>
          }
        />
        <Route
          path="/edit-transaction/:id"
          element={
            <>
              <PageTitle title="All Transaction" />
              <EditTransaction />
            </>
          }
        />
        <Route
          path="/distributor/add-distributor"
          element={
            <>
              <PageTitle title="Add Distributor" />
              <AddDistributor />
            </>
          }
        />
        <Route
          path="/distributor/distributor-list"
          element={
            <>
              <PageTitle title="All Distributor" />
              <DistributorList />
            </>
          }
        />
        <Route
          path="/Machine/machine-list"
          element={
            <>
              <PageTitle title="Machine List" />
              <MachineList />
            </>
          }
        />
        <Route
          path="/Machine/add-machine"
          element={
            <>
              <PageTitle title="Add Machine" />
              <AddMachineMaster />
            </>
          }
        />
        <Route
          path="/Machine/registration"
          element={
            <>
              <PageTitle title="Machine Registration" />
              <Registration />
            </>
          }
        />
        <Route
          path="/Machine/free-machine-list"
          element={
            <>
              <PageTitle title="Free Machine List" />
              <FreeMachineList />
            </>
          }
        />
        <Route
          path="/Machine/free-machine-list/edit-free-machine/:id"
          element={
            <>
              <PageTitle title="EditFreeMachine List" />
              <EditFreeMachine />
            </>
          }
        />
        <Route
          path="/Machine/occupied-machine-list"
          element={
            <>
              <PageTitle title="Occupied Machine List" />
              <OccupiedMachineList />
            </>
          }
        />
        <Route
          path="/Machine/occupied-machine-list/edit-occupied-machine/:id"
          element={
            <>
              <PageTitle title="EditOccupiedMachine List" />
              <EditOccupiedMachine />
            </>
          }
        />
        {/* franchise */}
        <Route
          path="/franchise/add-franchise"
          element={
            <>
              <PageTitle title="Add Franchise" />
              <AddFranchise />
            </>
          }
        />
        <Route
          path="/franchise/franchise-details"
          element={
            <>
              <PageTitle title="Franchise Details" />
              <FranchiseDetails />
            </>
          }
        />
        <Route
          path="/franchise/franchise-details/edit-franchise/:id"
          element={
            <>
              <PageTitle title="Franchise Edit" />
              <EditFranchise />
            </>
          }
        />
        <Route
          path="/franchise/franchise-purchase"
          element={
            <>
              <PageTitle title="Franchise Purchase" />
              <FranchisePurchase />
            </>
          }
        />
        <Route
          path="/franchise/franchise-purchase/view-franchise-purchase/:id"
          element={
            <>
              <PageTitle title="Franchise Edit" />
              <FranchiseOrderView />
            </>
          }
        />
        <Route
          path="/franchise/paid-payout"
          element={
            <>
              <PageTitle title="Paid Payout" />
              <PaidPayout />
            </>
          }
        />
        <Route
          path="/franchise/pending-payout"
          element={
            <>
              <PageTitle title="Pending Payout" />
              <PendingPayout />
            </>
          }
        />
        <Route
          path="/franchise/pending-stock"
          element={
            <>
              <PageTitle title="Pending Stock" />
              <PendingStock />
            </>
          }
        />
        <Route
          path="/franchise/pending-stock/view-franchise-pending/:id"
          element={
            <>
              <PageTitle title="Franchise Edit" />
              <FranchisePendingView />
            </>
          }
        />
        <Route
          path="/franchise/repurchase-order"
          element={
            <>
              <PageTitle title="Repurchase Order" />
              <RepurchaseOrder />
            </>
          }
        />
        <Route
          path="/franchise/repurchase-order/view-franchise-repurchase/:id"
          element={
            <>
              <PageTitle title="Franchise repurchase" />
              <FranchiserepurchaseView />
            </>
          }
        />
        <Route
          path="/franchise/sale-product"
          element={
            <>
              <PageTitle title="Sale Product" />
              <SaleProduct />
            </>
          }
        />
        <Route
          path="/franchise/withdrawal-pending"
          element={
            <>
              <PageTitle title="Withdrawal Pending" />
              <WithdrawalPending />
            </>
          }
        />
        <Route
          path="/franchise/withdrawal-approved"
          element={
            <>
              <PageTitle title="Withdrawal Approved" />
              <WithdrawalApproved />
            </>
          }
        />

        {/* Coin */}
        <Route
          path="/coin/add-coin"
          element={
            <>
              <PageTitle title="Add Coin" />
              <AddCoin />
            </>
          }
        />
        <Route
          path="/coin/coin-list"
          element={
            <>
              <PageTitle title="Coin List" />
              <CoinList />
            </>
          }
        />
        <Route
          path="/rewards/adjust-rewards"
          element={
            <>
              <PageTitle title="Adjust Rewards" />
              <AdjustRewards />
            </>
          }
        />
        <Route
          path="/Earnings/Reset-earnings"
          element={
            <>
              <PageTitle title="Reset Earnings" />
              <ResetEarning />
            </> 
          }
        />
        <Route
          path="/reward/rewards"
          element={
            <>
              <PageTitle title="Reward" />
              <Rewards />
            </>
          }
        />
        {/* <Route
          path="/support/approved"
          element={
            <>
              <PageTitle title="Approved" />
              <Approved />
            </>
          }
        /> */}
        <Route
          path="/support"
          element={
            <>
              <PageTitle title="Support" />
              <Support />
            </>
          }
        />
        <Route
          path="/support/support-view/:id"
          element={
            <>
              <PageTitle title="SupportView" />
              <SupportView />
            </>
          }
        />
        {/* setting */}
        <Route
          path="/setting/general-setting"
          element={
            <>
              <PageTitle title="General settings" />
              <GeneralSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/registration/:id"
          element={
            <>
              <PageTitle title="Registration settings" />
              <RegistrationSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/investment/:id"
          element={
            <>
              <PageTitle title="Investment settings" />
              <InvestmentSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/withdrawal/:id"
          element={
            <>
              <PageTitle title="withdrawal settings" />
              <WithdrawalSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/fund/:id"
          element={
            <>
              <PageTitle title="Fund settings" />
              <FundSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/profile/:id"
          element={
            <>
              <PageTitle title="Profile settings" />
              <ProfileSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/dynamicpages/:id"
          element={
            <>
              <PageTitle title="Dynamicpages settings" />
              <DynamicpagesSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/reinvestment/:id"
          element={
            <>
              <PageTitle title="Reinvestment settings" />
              <ReInvestmentSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/account/:id"
          element={
            <>
              <PageTitle title="Account settings" />
              <AccountSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/registerwithOTP/:id"
          element={
            <>
              <PageTitle title="Register with OTP settings" />
              <RegisterWithOTPSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/btcaddressOTP/:id"
          element={
            <>
              <PageTitle title="BTC Address OTP settings" />
              <BtcAddressOTPSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/btcaddresswithOTP/:id"
          element={
            <>
              <PageTitle title="BTC Address With OTP settings" />
              <BtcAddressWithOTPSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/loginwithOTP/:id"
          element={
            <>
              <PageTitle title="Login with otp settings" />
              <LoginWithOTPSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/paymentmethod/:id"
          element={
            <>
              <PageTitle title="Payment Method settings" />
              <PaymentMethodSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/paymentmethodaccept/:id"
          element={
            <>
              <PageTitle title="Payment Accept Method settings" />
              <PaymentMethodAcceptSetting />
            </>
          }
        />

        <Route
          path="/setting/general-setting/paymentmethodaccept/upi/:id"
          element={
            <>
              <PageTitle title="UPI settings" />
              <PaymentMethodAcceptUpiSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/paymentmethodaccept/bank/:id"
          element={
            <>
              <PageTitle title="UPI settings" />
              <PaymentMethodAcceptBankSetting />
            </>
          }
        />
        <Route
          path="/setting/general-setting/paymentmethodaccept/usdt/:id"
          element={
            <>
              <PageTitle title="UPI settings" />
              <PaymentMethodAcceptUsdtSetting />
            </>
          }
        />

        <Route
          path="/setting/general-setting/companyinfo/:id"
          element={
            <>
              <PageTitle title="Company Info settings" />
              <CompanyInfoSetting />
            </>
          }
        />

        {/* <Route
          path="setting/back-up-setting"
          element={
            <>
              <PageTitle title="Database Backup" />
              <DataBaseBackUp />
            </>
          }
        />
        <Route path="/logout" element={<PageTitle title="Logout" />} />
        /> */}
        {/* <Route
          path="/logout"
          element={
            <>
              <PageTitle title="Logout" />
            </>
          }
        /> */}
        {/* other componant */}

        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons" />
              <Buttons />
            </>
          }
        />
        <Route
          path=""
          element={
            <>
              <PageTitle title="Buttons" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/password/change-password"
          element={
            <>
              <PageTitle title="change password" />
              <ChangePassword />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
