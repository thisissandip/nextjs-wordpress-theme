import Header from './Header';

function Layout({ children, primaryMenu, footerMenu }) {
	return (
		<>
			<Header menu={primaryMenu} />
			{children}
		</>
	);
}

export default Layout;
