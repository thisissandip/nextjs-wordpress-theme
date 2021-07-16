import Head from 'next/head';
import Layout from '../src/components/Layout';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../src/apollo-client';
import { GET_ALL_MENUS } from '../src/queries/getMenus';

import Header from '../src/components/Header';

export default function Home({ primaryMenu, footerMenu, sitesettings }) {
	return (
		<div>
			<Head>
				<title>{sitesettings?.title}</title>
				<meta name='description' content={sitesettings?.description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout primaryMenu={primaryMenu} footerMenu={footerMenu} title={sitesettings?.title}>
				<div className='flex justify-center bg-primary'>
					<div className='my-20 flex flex-col items-center text-white font-bold md:text-7xl  sm:text-5xl text-4xl '>
						<p className='front-page-title my-2 '>NextJS</p>
						<p className='front-page-title my-2'>WordPress Theme</p>
					</div>
				</div>
				<hr />
			</Layout>
		</div>
	);
}

export const getStaticProps = async () => {
	const { data } = await client.query({
		query: GET_ALL_MENUS,
	});

	return {
		props: {
			primaryMenu: data.primaryMenu,
			footerMenu: data.footerMenu,
			sitesettings: data.sitesettings,
		},
		revalidate: 10,
	};
};
