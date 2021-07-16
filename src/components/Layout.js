import Header from './Header';

function Layout({ children, primaryMenu, footerMenu, title }) {
	return (
		<>
			<Header menu={primaryMenu} title={title} />
			{children}
		</>
	);
}

export default Layout;
