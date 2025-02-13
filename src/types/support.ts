export interface Support {
  _id: string;
  uCode: {
    _id: string;
    name: string;
    username: string;
  };
  message: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  subject: string;
  ticket: string;
  msgBy: string;
  status: number;
  replyStatus: number;
  createdAt: string;
  updatedAt: string;
  approvedDate: string;
  reply: string;
}
