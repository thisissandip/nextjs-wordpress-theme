import { gql } from '@apollo/client';

export const GET_SEARCH_RESULTS = gql`
	query GET_SEARCH_RESULTS($searchtext: String!) {
		posts: posts(where: { search: $searchtext }, first: 6) {
			edges {
				node {
					date
					id
					slug
					excerpt
					title
					featuredImage {
						node {
							mediaItemUrl
						}
					}
				}
			}
			pageinfo: pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`;

export const GET_MORE_RESULTS = gql`
	query GET_MORE_RESULTS($searchtext: String!, $after: String!) {
		posts: posts(where: { search: $searchtext }, first: 6, after: $after) {
			edges {
				node {
					date
					id
					slug
					excerpt
					title
					featuredImage {
						node {
							mediaItemUrl
						}
					}
				}
			}
			pageinfo: pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`;
