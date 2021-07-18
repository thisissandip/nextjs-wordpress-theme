import { getToken, getPreviewUrl } from '../../src/utils/cookiesNredirects';

export default async function preview(req, res) {
	const { postType, postId } = req.query;

	const authToken = getToken(req);

	if (authToken === '') {
		res.writeHead(307, { Location: `/login/?postType=${postType}&postId=${postId ?? ''}` });
	} else {
		const previewUrl = getPreviewUrl(postType, postId);
		res.writeHead(307, { Location: previewUrl });
	}
	res.end();
}
