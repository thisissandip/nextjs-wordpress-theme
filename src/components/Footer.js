import Link from 'next/link';

function Footer({ primaryMenu, title, footerMenu, tagline }) {
	const menuItems = primaryMenu?.edges[0]?.node?.menuItems?.edges;
	const primaryMenuItems = menuItems?.map((item) => item.node);

	const menuItems2 = footerMenu?.edges[0]?.node?.menuItems?.edges;
	const footerMenuItems = menuItems2?.map((item) => item.node);

	return (
		<div className='footer-2 bg-gray-300 pt-4 md:pt-12'>
			<div className='container px-4 mx-auto'>
				<div className='md:flex md:flex-wrap md:-mx-4 py-6 md:pb-12'>
					<div className='footer-info lg:w-1/3 md:px-4'>
						<h4 className='text-white text-2xl mb-4'>{title}</h4>
						<p className='text-gray-400'>{tagline}</p>
						<div className='mt-4'></div>
					</div>

					<div className='md:w-2/3 lg:w-1/3 md:px-4 xl:pl-16 mt-8 lg:mt-0'>
						<div className='sm:flex'>
							<div className='sm:flex-1'>
								<h6 className='text-base font-medium text-black mb-2'>Explore</h6>
								<div>
									{primaryMenuItems?.map((item) => (
										<div className='cursor-pointer' key={item?.menuItemId}>
											<Link title={item.label} href={`${item?.path}`}>
												<span className='text-gray-400 py-1 block hover:underline'>{item.label}</span>
											</Link>
										</div>
									))}
								</div>
							</div>
							<div className='sm:flex-1 mt-4 sm:mt-0'>
								<h6 className='text-base font-medium text-black mb-2'>More</h6>
								<div>
									{footerMenuItems?.map((item) => (
										<div className='cursor-pointer' key={item?.menuItemId}>
											<Link title={item.label} href={`${item?.path}`}>
												<span className='text-gray-400 py-1 block hover:underline'>{item.label}</span>
											</Link>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className='md:w-1/3 md:px-4 md:text-center mt-12 lg:mt-0'>
						<h5 className='text-lg text-white font-medium mb-4'>Explore our site</h5>
						<button className='bg-indigo-600 text-white hover:bg-indigo-700 rounded py-2 px-6 md:px-12 transition-colors duration-300'>
							Explore
						</button>
					</div>
				</div>
			</div>

			<div className='border-t border-solid border-gray-400 mt-4 py-4 flex justify-center'>
				<div>© Copyright 2021. All Rights Reserved.</div>
			</div>
		</div>
	);
}

export default Footer;
