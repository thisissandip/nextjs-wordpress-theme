import client from '../../../src/apollo-client';
import { GET_SINGLE_POST_BY_ID } from '../../../src/queries/get-single-page';
import { isEmpty } from 'lodash';
import Layout from '../../../src/components/Layout';
import { useRouter } from 'next/router';
import { getToken } from '../../../src/utils/cookiesNredirects';

function PostPreview({ primaryMenu, footerMenu, sitesettings, post }) {
	const router = useRouter();
	return (
		<Layout
			primaryMenu={primaryMenu}
			footerMenu={footerMenu}
			title={sitesettings?.title}
			tagline={sitesettings?.description}>
			<div className='flex justify-center'>
				<div className='mb-10 md:my-20 flex flex-col items-center text-primary font-bold '>
					<p className='front-page-title my-1 md:my-2 md:text-7xl  sm:text-5xl text-4xl'>{post?.title}</p>
				</div>
			</div>
			<div
				className='content md:max-w-3xl max-w-xl mx-auto px-5 mb-20'
				dangerouslySetInnerHTML={{ __html: post?.content }}></div>
		</Layout>
	);
}

export default PostPreview;

export async function getServerSideProps(context) {
	const authToken = getToken(context.req);

	const { params } = context || {};
	if (isEmpty(authToken)) {
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
		};
	}
	const { data, errors } = await client.query({
		query: GET_SINGLE_POST_BY_ID,
		variables: {
			id: params.id,
		},
		headers: {
			authorization: authToken ? `Bearer ${authToken}` : '',
		},
	});

	//  data is null redirect to 404
	if (
		isEmpty(data.primaryMenu) ||
		isEmpty(data.footerMenu) ||
		isEmpty(data.sitesettings) ||
		errors ||
		isEmpty(data.post)
	) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			primaryMenu: data.primaryMenu,
			footerMenu: data.footerMenu,
			sitesettings: data.sitesettings,
			post: data.post,
		},
	};
}
