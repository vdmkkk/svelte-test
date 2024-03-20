import type { Cookies } from "@sveltejs/kit";

export function load({ cookies }: {cookies: Cookies}) {
	const JWT = cookies.get('JWT');

	return {
		JWT: JWT,
	};
}
