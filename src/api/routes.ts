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
    REPLY_MESSAGE: string;
    UPDATE_TICKET_STATUS: (ticketId: string) => string;
  };
  WITHDRAWAL: {
    GET_ALL: string;
    UPDATE_REQUEST:string;
  };
  USER: {
    GET_BY_ID: string;
    GET_ALL: string;
    UPDATE_PROFILE:string;
  };
  ORDER: {
    GET_ALL: string;
    GET_BY_ID: (orderId: string) => string;
  };
  TRANSACTION: {
    GET_ALL: string;
    FUND: {};
    INCOME: {
      GET_ALL: string;
    };
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
    GET_ALL_TICKETS: `${API_URL}/api/tickets/all`,
    GET_MESSAGES: (ticketId: string) =>
      `${API_URL}/api/tickets/${ticketId}/messages`,
    REPLY_MESSAGE: `${API_URL}/api/tickets/message/reply`,
    UPDATE_TICKET_STATUS: (ticketId) =>
      `${API_URL}/api/tickets/status/${ticketId}`,
  },
  WITHDRAWAL: {
    GET_ALL: `${API_URL}/api/withdrawal/get-all-transactions`,
    UPDATE_REQUEST:`${API_URL}/api/withdrawal/update-request`,
  },
  USER: {
    GET_BY_ID: `${API_URL}/api/user/info/get`,
    GET_ALL: `${API_URL}/api/user/get-all`,
    UPDATE_PROFILE:`${API_URL}/api/user/update/profile`,
  },
  ORDER: {
    GET_ALL: `${API_URL}/api/orders/get-all`,
    GET_BY_ID: (orderId: string) => `${API_URL}/api/orders/get/${orderId}`,
  },
  TRANSACTION: {
    GET_ALL: `${API_URL}/api/transaction/get-all`,
    FUND: {},
    INCOME: {
      GET_ALL: `${API_URL}/api/transaction/income/all`,
    },
  },
};
