import Head from 'next/head';
import Layout from '../src/components/Layout';
import client from '../src/apollo-client';
import Link from 'next/link';
import Image from 'next/image';
import { GET_FIRST_NINE_BLOGS, GET_MORE_BLOGS } from '../src/queries/get-blogs';
import { first, isEmpty } from 'lodash';
import { useLazyQuery } from '@apollo/client';
import PostCard from '../src/components/PostCard';
import { useEffect, useState } from 'react';

export default function Blogs({ primaryMenu, footerMenu, sitesettings, posts, pageinfo }) {
	const [allposts, setAllPosts] = useState(posts?.edges ?? []);
	const [endCursor, serEndCursor] = useState(pageinfo.endCursor);
	const [hasnext, setHasNext] = useState(pageinfo.hasNextPage);

	let blogstodisplay = allposts?.map((edge, i) => <PostCard key={i} edge={edge} />);

	// Load More Lazy Query

	const [getMoreBlogs, { loading }] = useLazyQuery(GET_MORE_BLOGS, {
		variables: { endCursor: endCursor },
		onCompleted: (data) => {
			if (data?.posts?.edges) {
				const newAllPosts = allposts.concat(data?.posts?.edges);
				setAllPosts(newAllPosts);
				setHasNext(data.posts?.pageinfo?.hasNextPage);
			}
		},
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
				<div className='latest-blog mx-auto flex flex-wrap justify-center md:mt-10 mt-5 mb-3'>{blogstodisplay}</div>
				{hasnext ? (
					loading ? (
						'Loading'
					) : (
						<button
							onClick={() => getMoreBlogs()}
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
		query: GET_FIRST_NINE_BLOGS,
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
			posts: data.posts,
			pageinfo: data.posts.pageinfo,
		},
	};
};
