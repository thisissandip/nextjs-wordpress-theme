import client from '../../../src/apollo-client';
import { GET_SINGLE_PAGE_BY_ID } from '../../../src/queries/get-single-page';
import { isEmpty } from 'lodash';
import Layout from '../../../src/components/Layout';
import { useRouter } from 'next/router';
import { getToken } from '../../../src/utils/cookiesNredirects';

function PagePreview({ primaryMenu, footerMenu, sitesettings, page }) {
	const router = useRouter();
	return (
		<Layout primaryMenu={primaryMenu} footerMenu={footerMenu} title={sitesettings?.title}>
			{page?.title}
		</Layout>
	);
}

export default PagePreview;

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
		query: GET_SINGLE_PAGE_BY_ID,
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
		isEmpty(data.page)
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
			page: data.page,
		},
	};
}
