// Define the API_URL using environment variables
export const API_URL: string = import.meta.env.VITE_API_URL;

// Define the ROUTES object with proper typing
interface Routes {
  AUTH: {
    ADMIN_LOGIN: string;
    REGISTER: string;
    LOGOUT: string;
    CHANGE_PASSWORD: string;
    IMPERSONATE: string;
  };
  MACHINE: {
    ADD: string;
    GET_ALL: (status?: number, page?: number, limit?: number) => string;
    UPDATE: (machineId: string) => string;
    GET_BY_ID: (machineId: string) => string;
    DELETE: (machienId: string) => string;
  };
  POSTS: {
    GET_ALL: string;
    GET_POST: (postId: string) => string;
  };
  COIN: {
    ADD: string;
    UPDATE: (coinId: string) => string;
    DELETE: (coinId: string) => string;
    GET_ALL: (
      name?: string,
      symbol?: string,
      page?: number,
      limit?: number,
    ) => string;
    GET_BY_ID: (coinId: string) => string;
  };
  MACHINEREGISTER: {
    REGISTER: string;
    GET_ALL: (
      mName?: string,
      productKey?: string,
      macAddress?: string,
      page?: number,
      limit?: number,
      userId?: string,
    ) => string;
    GET_FREE_MACHINES: (
      mName?: string,
      productKey?: string,
      page?: number,
      limit?: number,
    ) => string;
    GET_OCCUPIED_MACHINES: (
      mName?: string,
      productKey?: string,
      page?: number,
      limit?: number,
    ) => string;
    GET_ALL_LIVE_MACHINES: string;
    GET_BTC_ADDRESS_BALANCE: string;
    GET_BY_ID: (machienId: string) => string;
    UPDATE: (machineId: string) => string;
    UPDATE_STATUS: (machineId: string) => string;
    DELETE: (machineId: string) => string;
    RESET_MACHINE: (machineId: string) => string;
  };
  FRENCHISE: {
    GET_BY_ID(id: string): string;
    ADD: string;
    UPDATE: (frUserId: string) => string;
    GET_ALL: (page?: number, limit?: number) => string;
  };
  USER: {
    ADD: string;
    GET_ALL: (
      searchterm?: string,
      isActive?: number,
      blockStatus?: number,
      limit?: number,
      page?: number,
      includeTotalMachine?: string,
    ) => string;
    GET_BY_ID: (userId: string) => string;
    UPDATE: (userId: string) => string;
  };
  TRANSACTION: {
    GET_ALL: (
      page?: number,
      limit?: number,
      inOut?: string,
      txHash?: string,
      status?: string,
    ) => string;
    TOTAL_WITHDRAWALS: string;
    GET_BY_ID(id: string): string;
    UPDATE(id: string): string;
    GET_BY_USERID: (userId: string) => string;
  };
  BLOCKREWARDS: {
    ADJUST_REWARDS: string;
    REWARD_PAY: string;
    TOTAL_REWARD: string;
  };
  PAYOUT_REPORT: {
    PREPARE_OUT: string;
    TATUM_PAYOUT: string;
    GET_PAYOUT_REPORT: (
      searchterm?: string,
      blockStart?: string,
      blockEnd?: string,
      status?: string,
      date?: string,
      limit?: number,
      page?: number,
    ) => string;
  };
  TAILSCALE: {
    GET: string;
  };
  COMPANY_INFO: {
    GET: (
      title?: string,
      label?: string,
      value?: string,
      type?: string,
      searchterm?: string,
      status?: number,
      limit?: number,
      page?: number,
    ) => string;
    UPDATE: (id: string) => string;
  };
  SUPPORT: {
    GET_ALL: (
      ticket?: string,
      username?: string,
      date?: string,
      status?: number,
      limit?: number,
      page?: number,
    ) => string;
    UPDATE: (id: string) => string;
    GET_ALL_TICKETS: string;
    GET_MESSAGES: (ticketId: string) => string;
    REPLY_MESSAGE:string;
    UPDATE_TICKET_STATUS: (ticketId: string)=>string;
  };
}

// Define and export the ROUTES object
export const ROUTES: Routes = {
  AUTH: {
    ADMIN_LOGIN: `${API_URL}/api/auth/admin/login`,
    REGISTER: `${API_URL}/api/user/add`,
    LOGOUT: `${API_URL}/api/auth/logout`,
    CHANGE_PASSWORD: `${API_URL}/api/auth/change-password`,
    IMPERSONATE: `${API_URL}/api/auth/admin/impersonate`,
  },
  MACHINE: {
    ADD: `${API_URL}/api/machines/create`,
    GET_ALL: (status?: number, page?: number, limit?: number) => {
      const query = new URLSearchParams();

      if (status !== undefined && status !== null)
        query.append('status', status.toString());
      if (page !== undefined && page !== null)
        query.append('page', page.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());

      return `${API_URL}/api/machines/get?${query.toString()}`;
    },
    UPDATE: (machineId: string) =>
      `${API_URL}/api/machines/update/${machineId}`,
    GET_BY_ID: (machineId: string) =>
      `${API_URL}/api/machines/get/${machineId}`,
    DELETE: (machienId: string) =>
      `${API_URL}/api/machines/delete/${machienId}`,
  },
  POSTS: {
    GET_ALL: `${API_URL}/posts`,
    GET_POST: (postId: string) => `${API_URL}/posts/${postId}`,
  },
  COIN: {
    ADD: `${API_URL}/api/coin/add`,
    UPDATE: (coinId) => `${API_URL}/api/coin/update/${coinId}`,
    DELETE: (coinId) => `${API_URL}/api/coin/delete/${coinId}`,
    GET_ALL: (
      name?: string,
      symbol?: string,
      page?: number,
      limit?: number,
    ) => {
      const query = new URLSearchParams();

      if (name !== undefined && name !== null)
        query.append('name', name.toString());
      if (symbol !== undefined && symbol !== null)
        query.append('symbol', symbol.toString());
      if (page !== undefined && page !== null)
        query.append('page', page.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());

      return `${API_URL}/api/coin/get?${query.toString()}`;
    },
    GET_BY_ID: (coinId: string) => `${API_URL}/api/coin/get/${coinId}`,
  },
  MACHINEREGISTER: {
    REGISTER: `${API_URL}/api/machineReg/register`,
    GET_ALL: (
      mName?: string,
      productKey?: string,
      macAddress?: string,
      page?: number,
      limit?: number,
      userId?: string,
    ) => {
      const query = new URLSearchParams();
      if (mName !== undefined && mName !== null)
        query.append('mName', mName.toString());
      if (productKey !== undefined && productKey !== null)
        query.append('productKey', productKey.toString());
      if (macAddress !== undefined && macAddress !== null)
        query.append('macAddress', macAddress.toString());
      if (userId !== undefined && userId !== null)
        query.append('userId', userId.toString());
      if (page !== undefined && page !== null)
        query.append('page', page.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());
      return `${API_URL}/api/machineReg/get?${query.toString()}`;
    },
    GET_FREE_MACHINES: (
      mName?: string | null,
      productKey?: string | null,
      page?: number,
      limit?: number,
    ) => {
      const query = new URLSearchParams();
      if (mName !== undefined && mName !== null)
        query.append('mName', mName.toString());
      if (productKey !== undefined && productKey !== null)
        query.append('productKey', productKey.toString());
      if (page !== undefined && page !== null)
        query.append('page', page.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());
      return `${API_URL}/api/machineReg/free-machines?${query.toString()}`;
    },
    GET_OCCUPIED_MACHINES: (
      mName?: string,
      productKey?: string,
      page?: number,
      limit?: number,
    ) => {
      const query = new URLSearchParams();
      if (mName !== undefined && mName !== null)
        query.append('mName', mName.toString());
      if (productKey !== undefined && productKey !== null)
        query.append('productKey', productKey.toString());
      if (page !== undefined && page !== null)
        query.append('page', page.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());
      return `${API_URL}/api/machineReg/occupied-machines?${query.toString()}`;
    },
    GET_ALL_LIVE_MACHINES: `${API_URL}/api/machineReg/live-machines`,
    GET_BTC_ADDRESS_BALANCE: `${API_URL}/api/machineReg/get-btc-balance`,
    GET_BY_ID: (machienId: string) =>
      `${API_URL}/api/machineReg/get/${machienId}`,
    UPDATE: (machineId: string) =>
      `${API_URL}/api/machineReg/update/${machineId}`,
    UPDATE_STATUS: (machineId: string) =>
      `${API_URL}/api/machineReg/${machineId}/status/toggle`,
    DELETE: (machineId: string) =>
      `${API_URL}/api/machineReg/delete/soft/${machineId}`,
    RESET_MACHINE: (machineId: string) =>
      `${API_URL}/api/machineReg/reset-machine/${machineId}`,
  },
  FRENCHISE: {
    ADD: `${API_URL}/api/frenchise/add`,
    UPDATE: (frUserId: string) => `${API_URL}/api/frenchise/update/${frUserId}`,
    GET_ALL: (page?: number, limit?: number) => {
      const query = new URLSearchParams();

      if (page !== undefined && page !== null)
        query.append('page', page.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());
      return `${API_URL}/api/frenchise/get?${query.toString()}`;
    },
    GET_BY_ID: (userId: string) => `${API_URL}/api/frenchise/get/${userId}`,
  },
  USER: {
    ADD: `${API_URL}/api/user/get`,
    GET_ALL: (
      searchterm?: string,
      isActive?: number,
      blockStatus?: number,
      limit?: number,
      page?: number,
      includeTotalMachine?: string,
    ) => {
      const query = new URLSearchParams();

      if (searchterm !== undefined && searchterm !== null)
        query.append('searchterm', searchterm.toString());
      if (isActive !== undefined && isActive !== null)
        query.append('isActive', isActive.toString());
      if (blockStatus !== undefined && blockStatus !== null)
        query.append('blockStatus', blockStatus.toString());
      if (page !== undefined && page !== null)
        query.append('page', page.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());
      if (includeTotalMachine !== undefined && includeTotalMachine !== null)
        query.append('includeTotalMachine', includeTotalMachine.toString());
      return `${API_URL}/api/user/get?${query.toString()}`;
    },
    GET_BY_ID: (userId: string) => `${API_URL}/api/user/get/${userId}`,
    UPDATE: (userId: string) => `${API_URL}/api/user/update/${userId}`,
  },
  TRANSACTION: {
    GET_ALL: (
      page?: number,
      limit?: number,
      inOut?: string,
      txHash?: string,
      status?: string,
    ) => {
      const query = new URLSearchParams();

      if (page !== undefined && page !== null)
        query.append('page', page.toString().trim());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString().trim());
      if (inOut !== undefined && inOut !== null)
        query.append('inOut', inOut.toString().trim());
      if (txHash !== undefined && txHash !== null)
        query.append('txHash', txHash.toString().trim());
      if (status !== undefined && status !== null)
        query.append('status', status.toString().trim());

      return `${API_URL}/api/transaction/get?${query.toString()}`;
    },
    TOTAL_WITHDRAWALS: `${API_URL}/api/transaction/total-withdrawals`,
    GET_BY_ID: (id: string) => `${API_URL}/api/transaction/get/${id}`,
    UPDATE: (id: string) => `${API_URL}/api/transaction/update/${id}`,
    GET_BY_USERID: (userId: string) => `${API_URL}/api/transaction/${userId}`,
  },
  BLOCKREWARDS: {
    ADJUST_REWARDS: `${API_URL}/api/block-rewards/adjust-reward`,
    REWARD_PAY: `${API_URL}/api/block-earnings/reward-pay`,
    TOTAL_REWARD: `${API_URL}/api/block-earnings/total-rewards`,
  },
  PAYOUT_REPORT: {
    PREPARE_OUT: `${API_URL}/api/payout/prepareout`,
    TATUM_PAYOUT: `${API_URL}/api/payout/tatum-payout`,
    GET_PAYOUT_REPORT: (
      searchterm?: string,
      blockStart?: string,
      blockEnd?: string,
      status?: string,
      date?: string,
      limit?: number,
      page?: number,
    ) => {
      const query = new URLSearchParams();

      if (searchterm !== undefined && searchterm !== null)
        query.append('searchterm', searchterm.toString());
      if (blockStart !== undefined && blockStart !== null)
        query.append('blockStart', blockStart.toString());
      if (blockEnd !== undefined && blockEnd !== null)
        query.append('blockEnd', blockEnd.toString());
      if (status !== undefined && status !== null)
        query.append('status', status.toString());
      if (date !== undefined && date !== null)
        query.append('date', date.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());
      if (page !== undefined && page !== null)
        query.append('page', page.toString());
      return `${API_URL}/api/payout/get?${query.toString()}`;
    },
  },
  TAILSCALE: {
    GET: `${API_URL}/api/tailScales/get`,
  },
  COMPANY_INFO: {
    GET: (
      title?: string,
      label?: string,
      value?: string,
      type?: string,
      searchterm?: string,
      status?: number,
      limit?: number,
      page?: number,
    ) => {
      const query = new URLSearchParams();

      if (title !== undefined && title !== null)
        query.append('title', title.toString());
      if (label !== undefined && label !== null)
        query.append('label', label.toString());
      if (value !== undefined && value !== null)
        query.append('value', value.toString());
      if (type !== undefined && type !== null)
        query.append('type', type.toString());
      if (searchterm !== undefined && searchterm !== null)
        query.append('searchterm', searchterm.toString());
      if (status !== undefined && status !== null)
        query.append('status', status.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());
      if (page !== undefined && page !== null)
        query.append('searchterm', page.toString());

      return `${API_URL}/api/company-info/get?${query.toString()}`;
    },
    UPDATE: (id: string) => `${API_URL}/api/company-info/update/${id}`,
  },
  SUPPORT: {
    GET_ALL: (
      ticket?: string,
      username?: string,
      date?: string,
      status?: number,
      limit?: number,
      page?: number,
    ) => {
      const query = new URLSearchParams();

      if (ticket !== undefined && ticket !== null)
        query.append('ticket', ticket.toString());
      if (username !== undefined && username !== null)
        query.append('username', username.toString());
      if (date !== undefined && date !== null)
        query.append('date', date.toString());
      if (status !== undefined && status !== null)
        query.append('status', status.toString());
      if (limit !== undefined && limit !== null)
        query.append('limit', limit.toString());
      if (page !== undefined && page !== null)
        query.append('page', page.toString());

      return `${API_URL}/api/support/get-requests?${query.toString()}`;
    },
    UPDATE: (id: string) => `${API_URL}/api/support/update-request/${id}`,
    GET_ALL_TICKETS:`${API_URL}/api/tickets/all`,
    GET_MESSAGES: (ticketId: string) =>
      `${API_URL}/api/tickets/${ticketId}/messages`,
    REPLY_MESSAGE:`${API_URL}/api/tickets/message/reply`,
    UPDATE_TICKET_STATUS:(ticketId)=>`${API_URL}/api/tickets/status/${ticketId}`
  },
};
