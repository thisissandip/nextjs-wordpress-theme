import { gql } from '@apollo/client';
import { PAGE_COUNT } from '../utils/constants';

export const GET_ALL_PAGES = gql`
	query GET_ALL_PAGES {
		pages(first: ${PAGE_COUNT}) {
			edges {
				node {
					uri
					slug
					id
				}
			}
		}
	}
`;

export const GET_ALL_POSTS = gql`
	query GET_ALL_POSTS {
		posts(first: ${PAGE_COUNT}) {
			edges {
				node {
					uri
					slug
					id
				}
			}
		}
	}
`;

export const FIRST_6_POSTS = `
		firstsix: posts(first: 6) {
			edges {
			node {
				author {
				node {
					id
				}
				}
				date
				id
				slug
				excerpt
				title
				content
				featuredImage {
				node {
					mediaItemUrl
				}
				}
			}
			}
		}`;

export const GET_FIRST_6_POSTS = gql`
	query GET_FIRST_6_POSTS {
		${FIRST_6_POSTS}
	}
`;
