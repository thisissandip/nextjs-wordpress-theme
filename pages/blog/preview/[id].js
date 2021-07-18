import client from '../../../src/apollo-client';
import { GET_SINGLE_POST_BY_ID } from '../../../src/queries/get-single-page';
import { isEmpty } from 'lodash';
import Layout from '../../../src/components/Layout';
import { useRouter } from 'next/router';
import { getToken } from '../../../src/utils/cookiesNredirects';

function PostPreview({ primaryMenu, footerMenu, sitesettings, post }) {
	const router = useRouter();
	return (
		<Layout primaryMenu={primaryMenu} footerMenu={footerMenu} title={sitesettings?.title}>
			{post?.title}
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
