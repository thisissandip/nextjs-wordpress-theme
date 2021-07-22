import { GET_ALL_POSTS } from '../../src/queries/get-all-pages';
import Layout from '../../src/components/Layout';
import { GET_SINGLE_POST_BY_SLUG, GET_SINGLE_POST_BY_ID } from '../../src/queries/get-single-page';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import client from '../../src/apollo-client';
import { isEmpty } from 'lodash';
import { FALLBACK } from '../../src/utils/constants';

function Post({ primaryMenu, footerMenu, sitesettings, postdata }) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Layout primaryMenu={primaryMenu} footerMenu={footerMenu} title={sitesettings?.title}>
				<div className='flex justify-center'>
					<div className='mb-10 md:my-20 flex flex-col items-center text-primary font-bold '>
						<p className='front-page-title my-1 md:my-2 md:text-7xl  sm:text-5xl text-4xl'>{postdata?.title}</p>
					</div>
				</div>
				<div
					className='content md:max-w-3xl max-w-xl mx-auto px-5 mb-20'
					dangerouslySetInnerHTML={{ __html: postdata?.content }}></div>
			</Layout>
		</>
	);
}

export default Post;

export async function getStaticProps(context) {
	const { slug } = context.params;

	const { data, errors } = await client.query({
		query: GET_SINGLE_POST_BY_SLUG,
		variables: { id: slug },
	});

	// post data is null redirect to 404
	if (isEmpty(data.post) || errors) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			primaryMenu: data.primaryMenu,
			footerMenu: data.footerMenu,
			sitesettings: data.sitesettings,
			postdata: data.post,
		},
	};
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_ALL_POSTS,
	});

	let allpostsIds =
		data?.posts?.edges &&
		data?.posts?.edges.map((post) => {
			const id = post?.node?.id;
			return {
				params: { slug: id },
			};
		});

	return {
		paths: allpostsIds,
		fallback: FALLBACK,
	};
}
