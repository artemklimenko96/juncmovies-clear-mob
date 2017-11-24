export default function reducer(state={
	user: {
		name: '',
	},
	token: '',
	logging: false,
	logged: false,
}, action) {
	switch (action.type) {
		case "USER_LOGIN": {
			return {...state, logging:true}
		}
		case "USER_LOGIN_REJECTED": {
			return {...state, logging:false, error: action.payload}
		}
		case "USER_LOGIN_FULFILLED": {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				logging:false,
				logged: true,
			}
		}
		default:
     		return state
	}	
}