import cookie from 'cookie';
import { isEmpty } from 'lodash';

/* Cookies */

export function parseCookie(req) {
	return cookie.parse(req ? req.headers.cookie : '');
}

export function getToken(req) {
	const cookies = parseCookie(req);
	return cookies.mytoken || '';
}

/* Redirects */

export const getPreviewUrl = (postType, postId) => {
	if (isEmpty(postType) || isEmpty(postId)) {
		return '/504';
	}

	switch (postType) {
		case 'post':
			return `/blog/preview/${postId}/`;
		case 'page':
			return `/page/preview/${postId}/`;
		default:
			return '/';
	}
};
