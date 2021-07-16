import { gql } from '@apollo/client';
import { GET_ALL_MENUS } from './get-menus';

export const GET_SINGLE_PAGE_BY_ID = gql`
	query GET_SINGLE_PAGE_BY_ID($uri: String!) {
		primaryMenu: menus(where: { location: PRIMARY }) {
			edges {
				node {
					id
					menuItems {
						edges {
							node {
								url
								menuItemId
								label
								path
							}
						}
					}
				}
			}
		}
		footerMenu: menus(where: { location: FOOTER }) {
			edges {
				node {
					id
					menuItems {
						edges {
							node {
								url
								menuItemId
								label
								path
							}
						}
					}
				}
			}
		}
		sitesettings: generalSettings {
			title
			description
		}
		page: pageBy(uri: $uri) {
			content(format: RENDERED)
			pageId
			title
			status
		}
	}
`;
