import Layout from '../src/components/Layout';
import client from '../src/apollo-client';
import { GET_ALL_PAGES } from '../src/queries/get-all-pages';
import { GET_SINGLE_PAGE_BY_URI } from '../src/queries/get-single-page';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import { isEmpty } from 'lodash';
import { FALLBACK } from '../src/utils/constants';

function SinglePage({ primaryMenu, footerMenu, sitesettings, pagedata }) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Layout
				primaryMenu={primaryMenu}
				footerMenu={footerMenu}
				title={sitesettings?.title}
				tagline={sitesettings?.description}
				seo={pagedata?.seo}>
				<div className='flex justify-center'>
					<div className='mb-10 md:my-20 flex flex-col items-center text-primary font-bold md:text-7xl  sm:text-5xl text-4xl '>
						<p className='front-page-title my-1 md:my-2 '>{pagedata?.title}</p>
					</div>
				</div>
				<div
					className='content md:max-w-3xl max-w-xl mx-auto px-5 mb-20'
					dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pagedata?.content) }}></div>
			</Layout>
		</>
	);
}

export default SinglePage;

export async function getStaticProps(context) {
	const { slug } = context.params;

	const { data, errors } = await client.query({
		query: GET_SINGLE_PAGE_BY_URI,
		variables: { uri: slug.join('/') },
	});

	// page data is null redirect to 404
	if (isEmpty(data.page) || errors) {
		return {
			notFound: true,
		};
	}

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
		fallback: FALLBACK,
	};
}
