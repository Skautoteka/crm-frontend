import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

/**
 * Auth interceptor that intercepts outgoing requests
 * @param req
 * @param next
 * @returns
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => next(req)
