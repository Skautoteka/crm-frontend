import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { NEVER, Observable } from "rxjs";
import { AuthStore } from "../store/auth.store";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authStore = inject(AuthStore);

  if(authStore.user()) {
    return true;
  } else {
    authStore.refreshUser(state);
    return NEVER;
  }
}
