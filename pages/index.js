import Head from 'next/head';
import Layout from '../src/components/Layout';
import client from '../src/apollo-client';
import Link from 'next/link';
import Image from 'next/image';
import { GET_INDEX_PAGE_DATA } from '../src/queries/get-index-data';
import { first, isEmpty } from 'lodash';

export default function Home({ primaryMenu, footerMenu, sitesettings, firstsix }) {
	//console.log(firstsix);
	let firstsixposts = firstsix?.edges.map((edge) => {
		return (
			<Link key={edge?.node?.id} href={`/post/${edge?.node?.slug}`}>
				<div className='post-container inline-block md:mx-8 mx-5 md:mb-6 mb-4 w-80 cursor-pointer text-primary '>
					<div className='post-image-wrapper '></div>
					<div
						className='post-image ease-in h-60 bg-center rounded-lg hover:shadow-2xl transform transition ease'
						style={{
							background: `url(${edge?.node.featuredImage?.node?.mediaItemUrl}) center center / cover`,
						}}></div>

					<div className='post-title cursor-pointer font-bold my-5 mb-4 text-2xl w-50 '>{edge?.node?.title}</div>
				</div>
			</Link>
		);
	});

	return (
		<div>
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
