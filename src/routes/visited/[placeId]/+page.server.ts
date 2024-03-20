import type { Cookies } from "@sveltejs/kit";
import type { RouteParams } from "./$types";

export function load({ cookies, params }: {cookies: Cookies, params: RouteParams}) {
	const JWT = cookies.get('JWT');
    const placeId = params.placeId;

	return {
		JWT: JWT,
        placeId: placeId
	};
}
