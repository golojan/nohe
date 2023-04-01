export type DECODED_TOKEN = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  picture: string;
  mobile: string;
  lastLogin: Date;
  createdAt: Date;
};

// pages type
export type IPages = {
  id: string;
  title: string;
  pageType: string;
  slug: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
