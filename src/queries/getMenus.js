import { gql } from '@apollo/client';

export const GET_ALL_MENUS = gql`
	query GET_ALL_MENUS {
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
	}
`;
