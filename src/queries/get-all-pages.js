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
