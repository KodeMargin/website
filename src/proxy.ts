import { NextRequest, NextResponse } from "next/server"

// Gate /admin and /api/admin behind HTTP Basic auth. The browser renders the
// login prompt itself, so there is no login page to build or session to store.
// ponytail: single shared credential; move to real accounts if more than one
// person needs access or you need an audit trail of who sent what.
export default function proxy(request: NextRequest) {
    const user = process.env.ADMIN_USER
    const password = process.env.ADMIN_PASSWORD

    // Fail closed: no credentials configured means no admin access at all.
    if (!user || !password) {
        return new NextResponse("Admin access is not configured", { status: 503 })
    }

    const header = request.headers.get("authorization") ?? ""
    if (header.startsWith("Basic ")) {
        const [given, ...rest] = atob(header.slice(6)).split(":")
        if (given === user && rest.join(":") === password) {
            return NextResponse.next()
        }
    }

    return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="KodeMargin Admin"' },
    })
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
}
