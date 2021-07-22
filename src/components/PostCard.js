import Link from 'next/link';

function PostCard({ edge }) {
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
}

export default PostCard;
