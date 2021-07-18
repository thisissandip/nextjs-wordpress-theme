import cookie from 'cookie';
import LOGIN from '../../src/mutations/login';
import client from '../../src/apollo-client';
import { v4 } from 'uuid';

export default async function login(req, res) {
	try {
		const { username, password } = req.body ?? {};
		const data = await loginUser({ username, password });

		res.setHeader(
			'Set-Cookie',
			cookie.serialize('mytoken', String(data?.login?.authToken ?? ''), {
				httpOnly: true,
				secure: 'development' !== process.env.NODE_ENV,
				path: '/',
				maxAge: 60 * 60 * 24 * 7, // 1 week
			})
		);

		res.status(200).json({ success: Boolean(data?.login?.authToken) });
	} catch (err) {
		res.status(202).json({ success: false });
	}
}

async function loginUser({ username, password }) {
	const { data, errors } = await client.mutate({
		mutation: LOGIN,
		variables: {
			input: {
				clientMutationId: v4(), // Generate a unique id
				username: username || '',
				password: password || '',
			},
		},
	});

	if (errors) {
		return errors;
	} else if (data) {
		return data;
	}
}
