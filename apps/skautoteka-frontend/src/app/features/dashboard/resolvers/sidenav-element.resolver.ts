import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { SidenavElement } from "@skautoteka-frontend/ui";

export const sidenavElementResolver: ResolveFn<SidenavElement[]> = () => {
  const http = inject(HttpClient);
  return http.get<SidenavElement[]>('api/module');
}
