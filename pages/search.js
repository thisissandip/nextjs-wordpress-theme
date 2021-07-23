import Head from 'next/head';
import Layout from '../src/components/Layout';
import client from '../src/apollo-client';
import Link from 'next/link';
import Image from 'next/image';
import { GET_MENUS_AND_SETTINGS } from '../src/queries/get-menus';
import { first, isEmpty } from 'lodash';
import PostCard from '../src/components/PostCard';
import { GET_SEARCH_RESULTS, GET_MORE_RESULTS } from '../src/queries/get-search-results';
import { useEffect, useState } from 'react';
import querystring from 'query-string';
import { useLazyQuery } from '@apollo/client';

export default function Search({ primaryMenu, footerMenu, sitesettings }) {
	const queryparams = typeof window !== 'undefined' ? querystring.parse(window.location.search).query : '';

	const [query, setQuery] = useState(queryparams);
	const [allposts, setAllPosts] = useState([]);
	const [hasNext, setHasNext] = useState();
	const [endCursor, setEndCursor] = useState();

	const [getSearched, { loading }] = useLazyQuery(GET_SEARCH_RESULTS, {
		variables: { searchtext: queryparams },
		onCompleted: (data) => {
			if (data?.posts?.edges) {
				setAllPosts(data?.posts?.edges);
				setHasNext(data.posts?.pageinfo?.hasNextPage);
				setEndCursor(data.posts?.pageinfo?.endCursor);
			}
		},
	});

	const [getSearchMORE, { loadingMore }] = useLazyQuery(GET_MORE_RESULTS, {
		variables: { searchtext: queryparams, after: endCursor },
		onCompleted: (data) => {
			if (data?.posts?.edges) {
				const newAllPosts = allposts.concat(data?.posts?.edges);
				setAllPosts(newAllPosts);
				setHasNext(data.posts?.pageinfo?.hasNextPage);
				setEndCursor(data.posts?.pageinfo?.endCursor);
			}
		},
	});

	useEffect(() => {
		setQuery(queryparams);
		getSearched();
	}, [queryparams]);

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
				<div className='latest-blog mx-auto flex flex-wrap justify-center md:my-10 my-5'>
					{allposts?.map((edge, i) => (
						<PostCard key={i} edge={edge} />
					))}
				</div>

				{hasNext ? (
					loadingMore ? (
						'Loading'
					) : (
						<button
							onClick={() => getSearchMORE()}
							className='flex text-blue-700 mx-auto mb-10 border-2 hover:bg-blue-500 hover:text-white border-blue-500 px-4 py-2 transition-all ease rounded'>
							Load More
						</button>
					)
				) : (
					''
				)}
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
	};
};
