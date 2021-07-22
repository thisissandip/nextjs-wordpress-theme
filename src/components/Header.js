import useWidth from '../customHooks/useWidth';
import { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

function Header({ menu, title }) {
	const menuItems = menu?.edges[0]?.node?.menuItems?.edges;
	const primaryMenuItems = menuItems?.map((item) => item.node);

	const router = useRouter();

	const [searchtext, setSearchText] = useState('');

	const [width] = useWidth();

	useEffect(() => {
		let menu = document.querySelector('#menu');
		if (width > 768) {
			menu.classList.remove('h-60');
			menu.classList.remove('border-b-2');
		}
	}, [width]);

	const toggleMenu = () => {
		let menu = document.querySelector('#menu');
		menu.classList.toggle('h-60');
	};

	const handleSearch = () => {
		// if we are not in the search page push to the search page
		if (router.pathname !== '/search') {
			router.push({
				pathname: '/search',
				query: { query: searchtext },
			});
		} else {
			router.push({
				query: { query: searchtext },
			});
		}
	};

	return (
		<nav id='nav' className='bg-white border-0 border-b-2' role='navigation'>
			<div className='container overflow-hidden mx-auto p-4 flex justify-between flex-wrap  items-center md:flex-no-wrap'>
				<div className='mr-4 md:mr-8 cursor-pointer '>
					<Link href='/' rel='home'>
						<span className='text-xl text-primary font-bold'>{title}</span>
					</Link>
				</div>

				<div className='ml-auto md:hidden'>
					<button onClick={toggleMenu} className='flex items-center px-3 py-2' type='button'>
						<svg className='h-3 w-3 text-primary' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
							<title>Menu</title>
							<path fill='currentColor' d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
						</svg>
					</button>
				</div>
				<div
					id='menu'
					className='w-full h-0  transition-all ease-out duration-500 md:transition-none md:w-auto md:flex-grow md:flex md:items-center'>
					<ul
						id='ulMenu'
						className='flex flex-col duration-300 ease-out sm:transition-none mt-5 mx-4 md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:ml-auto md:border-0'>
						<li className='cursor-pointer'>
							<Link href={`/blogs`}>
								<span className='md:p-2 lg:px-4 font-semibold block text-primary px-4 py-1'>Blogs</span>
							</Link>
						</li>
						{primaryMenuItems?.map((item) => (
							<li className='cursor-pointer' key={item?.menuItemId}>
								<Link title={item.label} href={`${item?.path}`}>
									<span className='md:p-2 lg:px-4 font-semibold block text-primary px-4 py-1'>{item.label}</span>
								</Link>
							</li>
						))}
						<div className='md:ml-3 font-sans text-black bg-white flex items-center md:justify-center mt-2 md:mt-0 ml-4'>
							<div className='border rounded overflow-hidden flex'>
								<input
									type='text'
									className='px-4 py-1'
									value={searchtext}
									onChange={(e) => setSearchText(e.target.value)}
									placeholder='Search...'
								/>
								<button onClick={() => handleSearch()} className='flex items-center justify-center px-4 border-l'>
									<svg
										className='h-4 w-4 text-grey-dark'
										fill='currentColor'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'>
										<path d='M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z' />
									</svg>
								</button>
							</div>
						</div>
					</ul>
					{/* 	<div className='search-box ml-2'>
						<input type='text' className='border-2 rounded-md' />
					</div> */}
				</div>
			</div>
		</nav>
	);
}

export default Header;
