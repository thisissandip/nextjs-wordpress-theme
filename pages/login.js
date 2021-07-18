import { useState } from 'react';
import { GET_MENUS_AND_SETTINGS } from '../src/queries/get-menus';
import { getToken } from '../src/utils/cookiesNredirects';
import client from '../src/apollo-client';
import Layout from '../src/components/Layout';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getPreviewUrl } from '../src/utils/cookiesNredirects';

function login({ primaryMenu, footerMenu, sitesettings, isLoggedin }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState('');
	const [showInfo, setShowInfo] = useState(isLoggedin);

	const router = useRouter();

	const { postType, postId } = router?.query ?? {};

	const handleSubmit = async () => {
		setErrors('');
		const datatosend = {
			username,
			password,
		};
		if (username !== '' && password !== '') {
			const response = await axios.post('/api/login', datatosend, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.data.success) {
				setErrors('Username or Password is Invalid');
				setShowInfo(false);
			} else {
				setShowInfo(true);
				/* 	const previewLink = getPreviewUrl(postType, postId);
				router.push(previewLink); */
			}
		}
	};

	return (
		<Layout primaryMenu={primaryMenu} footerMenu={footerMenu} title={sitesettings?.title}>
			<div className='sm:max-w-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col mx-auto mt-40 md-shadow'>
				<form>
					{showInfo ? (
						<div className='info-container'>
							<div className='goto'>Preview links:</div>
							<div className='goto'>To Preview a post goto: /post/preview/[your_post_id]</div>
							<div className='goto'>To Preview a page goto: /page/preview/[your_page_id]</div>
						</div>
					) : (
						<>
							{' '}
							<div className='mb-4'>
								<label className='block text-primary text-sm font-bold mb-2' htmlFor='username'>
									Username
								</label>
								<input
									className='shadow appearance-none border border-gray-light rounded w-full py-2 px-3 text-grey-darker'
									id='username'
									type='text'
									value={username}
									placeholder='Username'
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-primary text-sm font-bold mb-2' htmlFor='password'>
									Password
								</label>
								<input
									className='shadow appearance-none border border-gray-light rounded w-full py-2 px-3 text-grey-darker mb-3 focus:border-primary-light'
									id='password'
									type='password'
									value={password}
									placeholder='Password'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='flex'>
								<button
									onClick={handleSubmit}
									className='bg-blue hover:bg-primary-light w-full ease-in text-white font-bold py-2 px-4 rounded bg-primary'
									type='button'>
									Sign In
								</button>
							</div>
							<div className='flex my-2 text-sm text-red-600 justify-center'>{errors}</div>{' '}
						</>
					)}
				</form>
			</div>
		</Layout>
	);
}

export default login;

export const getServerSideProps = async (context) => {
	const authToken = getToken(context.req);
	let isLoggedin = isEmpty(authToken) ? false : true;

	const { data, errors } = await client.query({
		query: GET_MENUS_AND_SETTINGS,
	});

	//  data is null redirect to 404
	if (isEmpty(data.primaryMenu) || isEmpty(data.footerMenu) || isEmpty(data.sitesettings) || errors) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			primaryMenu: data.primaryMenu,
			footerMenu: data.footerMenu,
			sitesettings: data.sitesettings,
			isLoggedin,
		},
	};
};
