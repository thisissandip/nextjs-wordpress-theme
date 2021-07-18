import Head from 'next/head';
import Layout from '../src/components/Layout';
import client from '../src/apollo-client';
import { GET_MENUS_AND_SETTINGS } from '../src/queries/get-menus';
import { isEmpty } from 'lodash';

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
		},
		revalidate: 10,
	};
};
