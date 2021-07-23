import Head from 'next/head';
import Layout from '../src/components/Layout';
import client from '../src/apollo-client';
import { GET_INDEX_PAGE_DATA } from '../src/queries/get-index-data';
import { first, isEmpty } from 'lodash';
import { NextSeo } from 'next-seo';
import PostCard from '../src/components/PostCard';

export default function Home({ primaryMenu, footerMenu, sitesettings, firstsix }) {
	//console.log(firstsix);
	let firstsixposts = firstsix?.edges.map((edge, i) => <PostCard key={i} edge={edge} />);

	const currentLocation = typeof window !== 'undefined' ? window.location.href : null;
	const opengraphUrl = process.env.NEXTJS_SITE_URL ? process.env.NEXTJS_SITE_URL : currentLocation;

	return (
		<div>
			<NextSeo title={sitesettings?.title} description={sitesettings?.description} canonical={opengraphUrl} />
			<Head>
				<title>{sitesettings?.title}</title>
				<meta name='description' content={sitesettings?.description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout
				primaryMenu={primaryMenu}
				footerMenu={footerMenu}
				title={sitesettings?.title}
				tagline={sitesettings?.description}>
				<div className='flex md:w-50 ml-12'>
					<div className='my-20 flex flex-col text-primary font-bold '>
						<p className='front-page-title my-2 md:text-7xl  sm:text-5xl text-4xl '>NextJS</p>
						<p className='front-page-title my-2 md:text-7xl  sm:text-5xl text-4xl '>WordPress Theme</p>
					</div>
				</div>
				<div className='latest-blog mx-auto flex flex-wrap justify-center md:my-10 my-5'>{firstsixposts}</div>
			</Layout>
		</div>
	);
}

export const getStaticProps = async () => {
	const { data, errors } = await client.query({
		query: GET_INDEX_PAGE_DATA,
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
			firstsix: data.firstsix,
		},
		/* 		revalidate: 10, */
	};
};
