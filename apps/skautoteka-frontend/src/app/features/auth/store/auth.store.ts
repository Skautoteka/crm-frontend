import { signalStore, withComputed, withState } from "@ngrx/signals";
import { User } from "../interfaces/iauth"
import { withAuthMethods } from "./auth.methods";
import { computed } from "@angular/core";

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
  withAuthMethods(),
  withComputed(store => {
    return {
      firstName: computed(() => {
        const user = store.user();
        return user ? user.firstName : null;
      }),
      lastName: computed(() => {
        const user = store.user();
        return user ? user.lastName : null;
      }),
      roleName: computed(() => {
        const user = store.user();
        return user ? user.role.name : null;
      })
    }
  })
)
