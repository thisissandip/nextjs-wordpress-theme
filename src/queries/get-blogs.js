import { gql } from '@apollo/client';
import { MENU_AND_SETTINGS } from './get-menus';

export const GET_FIRST_NINE_BLOGS = gql`
	query GET_FIRST_NINE_BLOGS {
		posts : posts(first: 9) {
           
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
		pageinfo:	pageInfo {
				endCursor
				hasNextPage
			}
		}
        ${MENU_AND_SETTINGS}
	}
`;

export const GET_MORE_BLOGS = gql`
	query GET_MORE_BLOGS($endCursor: String!) {
		posts : posts(first: 9, after: $endCursor) {
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
		pageinfo:	pageInfo {
				endCursor
				hasNextPage
			}
		}
        ${MENU_AND_SETTINGS}
	}
`;
