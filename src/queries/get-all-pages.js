import { gql } from '@apollo/client';

export const GET_ALL_PAGES = gql`
	query GET_ALL_PAGES {
		pages {
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
