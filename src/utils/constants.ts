enum COMPANY_INFORMATION {
	NAME = 'Aldana Laser',
	ID = 1,
	DESCRIPTION = 'Aplicación para consultoria de comestologia'
}
enum LEVELS {
	ADMIN = 1,
	MODERATOR = 2,
	CLIENT = 3
}
enum PASSWORD_RESET_STATUS {
	ACTIVE = 1,
	INACTIVE = 0
}


export default {
	COMPANY_INFORMATION,
	LEVELS,
	PASSWORD_RESET_STATUS,
	USER: {
		USER_VERIFIED: {
			VERIFIED: 1,
			NO_VERIFIED: 0
		}
	},
	NOTIFICATIONS: {
		STATUS: {
			READED: 1,
			UNREADED: 0
		}
	},
	PER_PAGE: 30,
	PER_PAGE_WEB: 10
}