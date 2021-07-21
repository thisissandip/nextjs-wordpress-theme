import { gql } from '@apollo/client';
import { MENU_AND_SETTINGS } from './get-menus';
import { FIRST_6_POSTS } from './get-all-pages';

export const GET_INDEX_PAGE_DATA = gql`
	query GET_INDEX_PAGE_DATA {
		${MENU_AND_SETTINGS}
		${FIRST_6_POSTS}
	}
`;
