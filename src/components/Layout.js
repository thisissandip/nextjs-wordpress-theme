import Header from './Header';
import Footer from './Footer';

function Layout({ children, primaryMenu, footerMenu, title, tagline }) {
	return (
		<>
			<Header menu={primaryMenu} title={title} />
			{children}
			<Footer primaryMenu={primaryMenu} footerMenu={footerMenu} title={title} tagline={tagline} />
		</>
	);
}

export default Layout;
