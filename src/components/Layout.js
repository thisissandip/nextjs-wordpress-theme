import Header from './Header';
import Footer from './Footer';
import Seo from './Seo';

function Layout({ children, primaryMenu, footerMenu, title, tagline, seo }) {
	return (
		<>
			{seo && <Seo seo={seo} />}

			<Header menu={primaryMenu} title={title} />
			{children}
			<Footer primaryMenu={primaryMenu} footerMenu={footerMenu} title={title} tagline={tagline} />
		</>
	);
}

export default Layout;
