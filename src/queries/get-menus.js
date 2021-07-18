import { gql } from '@apollo/client';

export const MENU_AND_SETTINGS = `primaryMenu: menus(where: { location: PRIMARY }) {
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
}`;

export const GET_MENUS_AND_SETTINGS = gql`
	query GET_MENUS_AND_SETTINGS {
		${MENU_AND_SETTINGS}
	}
`;
