import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const disabledRoutes = [""]; 
// "/", "/app", "create", "bridge", "profile/:id"

export function middleware(request: NextRequest) {
  // if (disabledRoutes.includes(request.nextUrl.pathname)) {
  //   return NextResponse.rewrite(new URL("/404", request.url));
  // }

  const pathname = request.nextUrl.pathname;

  // Check if the current path matches any of the disabled patterns
  const isDisabled = disabledRoutes.some((route) => {
    // Convert Next.js style pattern to regex pattern
    const pattern = route
      .replace(/\/:path\*/, "(/.*)?") // Convert :path* to regex
      .replace(/:[^/]+/g, "[^/]+"); // Convert other :params to regex

    return new RegExp(`^${pattern}$`).test(pathname);
  });

  if (isDisabled) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
}
