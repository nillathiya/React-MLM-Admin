import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DashboardCards from '../../components/Tables/DashboardCards';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../../store/store';
// import {
//   getAllFrenchiseUserAsync,
//   selectPaginationData as selectFrenchiseUserPaginationData,
// } from '../../features/frenchise/frenchiseSlice';
// import {
//   getAllUserAsync,
//   selectPaginationData as selectUserPaginationData,
// } from '../../features/user/userSlice';
// import {
//   getFreeMachinesListAsync,
//   getOccupiedMachineListAsync,
//   getAllLiveMachinesAsync,
//   getBtcAddressValueAsync,
//   selectFreeMachinePaginationData,
//   selectOccupiedMachinePaginationData,
//   selectAllLiveMachines,
//   selectBtcAddressValue,
// } from '../../features/machineRegister/machineRegisterSlice';
// import Loader from '../../common/Loader';
// import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const [isLoading, setIsLoading] = useState(false);

  // // Selectors for pagination data
  // const frenchiseUserPaginationData = useSelector(
  //   selectFrenchiseUserPaginationData,
  // );
  // const userPaginationData = useSelector(selectUserPaginationData);
  // const freeMachinePaginationData = useSelector(
  //   selectFreeMachinePaginationData,
  // );
  // const occupiedMachinePaginationData = useSelector(
  //   selectOccupiedMachinePaginationData,
  // );
  // const allLiveMachines = useSelector(selectAllLiveMachines);
  // const btcAddressValue = useSelector(selectBtcAddressValue);

  // // Total records from selectors
  // const totalFrenchiseUsers = frenchiseUserPaginationData?.totalRecords || 0;
  // const totalUsers = userPaginationData?.totalRecords || 0;
  // const totalFreeMachines = freeMachinePaginationData?.totalRecords || 0;
  // const totalOccupiedMachines =
  //   occupiedMachinePaginationData?.totalRecords || 0;

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Define a list of fetch functions and their conditions
  //     const fetchTasks = [];
  //     if (!totalFrenchiseUsers) {
  //       fetchTasks.push(dispatch(getAllFrenchiseUserAsync({})));
  //     }
  //     if (!totalUsers) {
  //       fetchTasks.push(dispatch(getAllUserAsync({})));
  //     }
  //     if (!totalFreeMachines) {
  //       fetchTasks.push(dispatch(getFreeMachinesListAsync({})));
  //     }
  //     if (!totalOccupiedMachines) {
  //       fetchTasks.push(dispatch(getOccupiedMachineListAsync({})));
  //     }
  //     if (!allLiveMachines) {
  //       fetchTasks.push(dispatch(getAllLiveMachinesAsync()));
  //     }
  //     if (!btcAddressValue) {
  //       fetchTasks.push(dispatch(getBtcAddressValueAsync()));
  //     }

  //     // Execute all fetch tasks concurrently
  //     await Promise.all(fetchTasks);
  //   } catch (err) {
  //     toast.error('Failed to load data.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [
  //   totalFrenchiseUsers,
  //   totalUsers,
  //   totalFreeMachines,
  //   totalOccupiedMachines,
  // ]);

  console.log("cookie",document.cookie);
  
  return (
    <>
      {/* {isLoading ? (
        <>
          <Loader loader="ClipLoader" size={50} color="blue" />
        </>
      ) : ( */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Main Wallet Balance" total={0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 907.137 907.137"
            width="24"
            height="24"
          >
            <path
              d="M806.582,235.309L766.137,87.125l-137.434,37.51L571.451,9.072L114.798,235.309H0v725.105h907.137V764.973h62.35v-337.53h-62.352V235.309H806.582z M718.441,170.63l17.654,64.68h-52.561h-75.887h-126.19l111.159-30.339l66.848-18.245L718.441,170.63z M839.135,892.414H68V522.062v-129.13v-10.233v-69.787v-9.602h35.181h27.538h101.592h409.025h75.889h37.43h35.242h35.244h13.994v51.272v72.86h-15.357h-35.244h-87.85H547.508h-55.217v27.356v75.888v8.758v35.244v35.244v155.039h346.846v127.441H839.135z M901.486,696.973h-28.352h-34H560.291V591.375v-35.244v-35.244v-23.889v-1.555h3.139h90.086h129.129h56.492h34h4.445h23.904V696.973z M540.707,100.191l21.15,42.688l-238.955,65.218L540.707,100.191z"
              fill="#3C50E0"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Frenchise User" total={0}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Free Machines" total={0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3C50E0"
              stroke-width="5"
              fill="none"
            />
            <rect x="45" y="5" width="10" height="20" fill="#3C50E0" />
            <rect x="45" y="75" width="10" height="20" fill="#3C50E0" />
            <rect x="5" y="45" width="20" height="10" fill="#3C50E0" />
            <rect x="75" y="45" width="20" height="10" fill="#3C50E0" />
            <rect x="20" y="20" width="10" height="10" fill="#3C50E0" />
            <rect x="70" y="20" width="10" height="10" fill="#3C50E0" />
            <rect x="20" y="70" width="10" height="10" fill="#3C50E0" />
            <rect x="70" y="70" width="10" height="10" fill="#3C50E0" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Occupied Machines" total={0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="30"
            height="30"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#3C50E0"
              stroke="none"
            >
              <path d="M1305 4193 c-11 -3 -30 -14 -42 -26 l-23 -20 0 -838 0 -837 -222 -5 c-168 -3 -238 -9 -283 -22 -509 -145 -734 -727 -450 -1167 109 -167 262 -276 465 -330 l85 -23 1725 0 1725 0 85 22 c232 62 410 208 511 418 48 100 68 176 76 285 24 362 -214 693 -572 795 -45 13 -115 19 -282 22 l-223 5 0 837 0 838 -26 24 -26 24 -1251 1 c-689 1 -1261 0 -1272 -3z m885 -568 l0 -416 25 -24 c14 -15 36 -25 52 -25 16 0 84 31 161 74 l132 74 133 -74 c76 -43 144 -74 160 -74 16 0 38 10 52 25 l25 24 0 416 0 415 395 0 395 0 0 -785 0 -785 -1160 0 -1160 0 0 785 0 785 395 0 395 0 0 -415z m2180 -1342 c440 -151 572 -690 250 -1014 -60 -61 -94 -85 -161 -117 -151 -72 -15 -67 -1899 -67 -1884 0 -1748 -5 -1899 67 -113 54 -220 159 -274 269 -155 316 -22 689 298 835 119 55 43 53 1900 51 l1720 -2 65 -22z" />
              <path d="M880 2153 c-251 -28 -439 -272 -400 -520 21 -136 116 -275 228 -336 132 -71 285 -76 417 -14 284 135 353 495 139 726 -96 104 -243 159 -384 144z" />
              <path d="M2487 2149 c-226 -33 -403 -256 -383 -486 28 -333 383 -525 677 -367 163 88 263 290 232 469 -44 254 -272 421 -526 384z" />
              <path d="M4116 2149 c-174 -25 -335 -176 -375 -350 -35 -149 14 -315 125 -426 143 -143 365 -174 546 -76 67 37 153 130 188 205 155 334 -119 700 -484 647z" />
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Live Machines" total={0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="30"
            height="30"
            viewBox="0 0 360.000000 360.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,360.000000) scale(0.100000,-0.100000)"
              fill="#3C50E0"
              stroke="none"
            >
              <path d="M2461 3325 c-92 -29 -147 -117 -139 -224 6 -81 42 -135 109 -165 l49 -21 -2 -226 c-4 -314 13 -299 -353 -299 l-245 0 0 425 c0 412 -1 426 -20 445 -18 18 -33 20 -195 20 -227 0 -215 10 -215 -179 l0 -139 -37 -13 c-79 -25 -229 -107 -315 -171 -49 -38 -92 -68 -95 -68 -2 0 -57 32 -122 70 -64 39 -124 70 -132 70 -9 0 -23 -8 -31 -17 -28 -32 -338 -585 -338 -603 0 -23 14 -34 139 -107 l106 -61 -5 -54 c-3 -29 -5 -123 -5 -208 0 -85 2 -179 5 -208 l5 -54 -106 -61 c-125 -73 -139 -84 -139 -107 0 -18 310 -571 338 -602 8 -10 22 -18 31 -18 8 0 69 32 135 71 80 48 123 69 132 63 7 -5 40 -31 75 -57 86 -66 184 -122 279 -160 l80 -31 0 -138 c0 -188 -12 -178 215 -178 162 0 177 2 195 20 19 19 20 33 20 445 l0 425 245 0 c366 0 349 15 353 -299 l2 -226 -49 -21 c-67 -29 -103 -85 -109 -164 -5 -73 11 -122 55 -171 88 -97 249 -82 327 29 24 33 31 55 34 105 3 53 0 70 -25 117 -24 45 -38 59 -83 83 l-55 28 -5 239 -5 238 -30 43 c-16 23 -50 53 -74 66 -43 22 -51 23 -313 23 l-268 0 0 90 0 90 283 0 282 0 180 -105 180 -105 0 -88 c0 -79 3 -93 27 -130 84 -126 265 -128 352 -4 40 57 48 149 18 208 -56 108 -174 152 -280 104 -35 -16 -48 -18 -65 -8 -12 6 -106 60 -208 119 l-186 109 -291 0 -292 0 0 85 0 85 460 0 460 0 10 -26 c46 -120 190 -174 300 -113 24 13 58 44 75 67 27 40 30 51 30 122 0 71 -3 82 -30 122 -99 141 -314 115 -375 -46 l-10 -26 -460 0 -460 0 0 85 0 85 292 0 291 0 186 109 c102 59 196 113 208 119 17 10 30 8 65 -8 106 -48 224 -4 280 104 30 59 22 151 -18 208 -87 124 -268 122 -352 -4 -24 -37 -27 -51 -27 -130 l0 -88 -180 -105 -180 -105 -282 0 -283 0 0 90 0 90 268 0 c262 0 270 1 313 23 24 13 58 43 74 66 l30 43 5 238 5 239 55 28 c45 24 59 38 83 83 72 138 -9 295 -163 314 -27 3 -63 0 -89 -9z m145 -116 c50 -47 49 -138 -3 -179 -35 -27 -111 -27 -146 0 -63 50 -54 157 15 197 33 19 104 10 134 -18z m-828 -366 l-3 -338 -55 -7 c-258 -43 -461 -236 -512 -487 -20 -97 -20 -139 0 -236 25 125 74 214 168 307 49 49 105 93 143 113 57 30 184 70 226 71 16 1 17 -35 17 -610z m1306 90 c53 -50 52 -129 -2 -180 -36 -34 -112 -34 -148 0 -36 34 -50 82 -36 125 11 33 42 68 70 79 29 12 92 -1 116 -24z m5 -638 c25 -25 29 -37 29 -81 0 -46 -4 -56 -35 -87 -33 -33 -39 -35 -81 -30 -79 8 -128 80 -104 152 17 51 53 75 112 75 41 0 54 -5 79 -29z m-488 -681 c52 -41 53 -132 3 -179 -29 -27 -87 -37 -125 -21 -76 31 -90 148 -24 200 35 27 111 27 146 0z" />
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Users" total={0}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>
      {/* )} */}

      <DashboardCards />
    </>
  );
};

export default Dashboard;
