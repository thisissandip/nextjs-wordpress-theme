import useWidth from '../customHooks/useWidth';
import { useEffect } from 'react';
import Link from 'next/link';

function Header({ menu, title }) {
	const menuItems = menu?.edges[0]?.node?.menuItems?.edges;
	const primaryMenuItems = menuItems?.map((item) => item.node);

	const [width] = useWidth();

	useEffect(() => {
		let menu = document.querySelector('#menu');
		if (width > 768) {
			menu.classList.remove('h-40');
		}
	}, [width]);

	const toggleMenu = () => {
		let menu = document.querySelector('#menu');
		menu.classList.toggle('h-40');
	};

	return (
		<nav id='nav' className='bg-white border-0' role='navigation'>
			<div className='container overflow-hidden mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap'>
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
						className='flex flex-col duration-300 ease-out sm:transition-none mt-5 mx-4 md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0'>
						{primaryMenuItems?.map((item) => (
							<li className='cursor-pointer' key={item?.menuItemId}>
								<Link title={item.label} href={`${item?.path}`}>
									<span className='md:p-2 lg:px-4 font-semibold block text-primary px-4 py-1'>{item.label}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Header;
