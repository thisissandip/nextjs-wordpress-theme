import { gql } from '@apollo/client';
import client from '../../src/apollo-client';

function ProductDetails({ product }) {
	console.log(product);
	return <div>Product Detials: {product.name}</div>;
}

export default ProductDetails;

export async function getStaticProps(context) {
	console.log(context);
	const { slug } = context.params;

	const { data } = await client.query({
		query: gql`
			query Product($slug: ID!) {
				product(id: $slug, idType: SLUG) {
					name
					status
					totalSales
					image {
						mediaItemUrl
						mediaItemId
						title
					}
					shortDescription
					productCategories {
						nodes {
							name
						}
					}
				}
			}
		`,
		variables: { slug },
	});

	return {
		props: {
			product: data.product,
		},
	};
}

export async function getStaticPaths() {
	const allpathsdata = await client.query({
		query: gql`
			query GET_PRODUCTS_SLUGS {
				products {
					edges {
						node {
							slug
							name
						}
					}
				}
			}
		`,
	});

	const allpaths = allpathsdata.data.products.edges.map((edge) => {
		return {
			params: { slug: edge.node.slug },
		};
	});

	return {
		paths: allpaths,
		fallback: false,
	};
}
