import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export default async function middleware(req) {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	const response = await fetch(`${process.env.API_ENDPOINT}u/loggedin`, {
		headers: {
			Cookie: `token=${token}`,
		},
		withCredentials: true,
		mode: "cors",
		method: "GET",
		credentials: "include",
	});

	if (response.ok) {
		const data = await response.json();
		if (data.role === "admin") {
			const requestHeaders = new Headers(req.headers);
			requestHeaders.set("x-user", JSON.stringify(data));
			return NextResponse.next({
				request: {
					headers: requestHeaders,
				},
			});
		} else {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}
}

export const config = {
	matcher: ["/dashboard"],
};
