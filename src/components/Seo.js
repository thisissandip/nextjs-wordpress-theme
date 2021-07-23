import { NextSeo } from 'next-seo';

function Seo({ seo }) {
	const {
		title,
		metaDesc,
		metaRobotsNoindex,
		metaRobotsNofollow,
		opengraphDescription,
		opengraphTitle,
		opengraphImage,
		opengraphSiteName,
	} = seo;

	const url = seo?.breadcrumbs[1]?.url;
	const currentLocation = typeof window !== 'undefined' ? window.location.href : null;
	const opengraphUrl = process.env.NEXTJS_SITE_URL ? process.env.NEXTJS_SITE_URL : currentLocation;

	return (
		<>
			<NextSeo
				title={title}
				description={opengraphDescription || metaDesc}
				canonical={opengraphUrl}
				noindex={metaRobotsNoindex}
				nofollow={metaRobotsNofollow}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: opengraphUrl,
					title: opengraphTitle,
					description: opengraphDescription,
					images: [
						{
							url: opengraphImage?.sourceUrl,
							width: 1280,
							height: 720,
						},
					],
					site_name: opengraphSiteName,
				}}
			/>
		</>
	);
}

export default Seo;
