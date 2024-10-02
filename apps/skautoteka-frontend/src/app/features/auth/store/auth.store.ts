import { signalStore, withState } from "@ngrx/signals";
import { User } from "../interfaces/iauth"
import { withAuthMethods } from "./auth.methods";

export type AuthStoreState = {
  user: User | null,
  isLoading: boolean;
}

const initialState: AuthStoreState = {
  user: null,
  isLoading: false,
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withAuthMethods()
)
