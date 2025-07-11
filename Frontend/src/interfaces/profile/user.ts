export interface UserType {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  favouriteCars: string[];
  selling: string[];
  buying: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  review: string;
  password?: string;
}
