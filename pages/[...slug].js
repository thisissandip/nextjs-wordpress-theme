import Layout from '../src/components/Layout';
import client from '../src/apollo-client';
import { GET_ALL_PAGES } from '../src/queries/get-all-pages';
import { GET_SINGLE_PAGE_BY_ID } from '../src/queries/get-single-page';
import { useRouter } from 'next/router';

function SinglePage({ primaryMenu, footerMenu, sitesettings, pagedata }) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Layout primaryMenu={primaryMenu} footerMenu={footerMenu} title={sitesettings?.title}>
				{pagedata?.title}
				{pagedata?.content}
			</Layout>
		</>
	);
}

export default SinglePage;

export async function getStaticProps(context) {
	const { slug } = context.params;

	const { data, errors } = await client.query({
		query: GET_SINGLE_PAGE_BY_ID,
		variables: { uri: slug.join('/') },
	});

	console.log(data.page);

	return {
		props: {
			primaryMenu: data.primaryMenu,
			footerMenu: data.footerMenu,
			sitesettings: data.sitesettings,
			pagedata: data.page,
		},
	};
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_ALL_PAGES,
	});

	// return all the id's of th page to get the data of each page
	let allpagesUri =
		data?.pages?.edges &&
		data?.pages?.edges.map((page) => {
			const slugs = page?.node?.uri?.split('/').filter((pageSlug) => pageSlug);
			return {
				params: { slug: slugs },
			};
		});

	return {
		paths: allpagesUri,
		fallback: true,
	};
}
