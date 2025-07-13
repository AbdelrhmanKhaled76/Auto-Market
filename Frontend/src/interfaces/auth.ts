import type { SigninType } from "./auth/Signin";

export interface AuthContextType {
  token: string | null;
  handleSignIn: (
    values: SigninType,
    setSubmitting: (isSubmitting: boolean) => void
  ) => Promise<void>;
  handleLogOut: () => Promise<void>;
  loading: boolean;
}
