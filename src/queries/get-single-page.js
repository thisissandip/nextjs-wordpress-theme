import { gql } from '@apollo/client';
import { MENU_AND_SETTINGS } from './get-menus';
import { SEO } from './seo-fragment';

export const GET_SINGLE_PAGE_BY_URI = gql`
	query GET_SINGLE_PAGE_BY_URI($uri: String!) {
		page: pageBy(uri: $uri) {
			content(format: RENDERED)
			pageId
			title
			status
			${SEO}
		}
		${MENU_AND_SETTINGS}
	}
`;

// for preview
export const GET_SINGLE_PAGE_BY_ID = gql`
	query GET_SINGLE_PAGE_BY_ID($id: ID!) {
		page: page(id: $id, idType: DATABASE_ID) {
			id
			content(format: RENDERED)
			title
			uri
			${SEO}
		}
		${MENU_AND_SETTINGS}
	}
`;

export const GET_SINGLE_POST_BY_SLUG = gql`
	query GET_SINGLE_POST_BY_ID($id: ID!) {
		post: post(id: $id, idType: SLUG) {
			id
			content(format: RENDERED)
			title
			uri
			${SEO}
		}
		${MENU_AND_SETTINGS}
	}
`;

// for preview
export const GET_SINGLE_POST_BY_ID = gql`
	query GET_SINGLE_POST_BY_ID($id: ID!) {
		post: post(id: $id, idType: DATABASE_ID) {
			id
			content(format: RENDERED)
			title
			uri
		}
		${MENU_AND_SETTINGS}
	}
`;
