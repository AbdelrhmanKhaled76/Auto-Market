import type { UserType } from "../profile/user";

export interface ReviewType {
  _id: string;
  rating: number;
  description: string;
  madeBy: string | UserType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
