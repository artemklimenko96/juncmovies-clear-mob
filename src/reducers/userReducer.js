export default function reducer(state={
	user: {
		name: '',
	},
	token: '',
	recordings: '',
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
				user: action.payload,
				token: action.payload.token,
				logging:false,
				logged: true,
			}
		}
		case "SET_USER_RECORDINGS": {
			return {
				...state,
				recordings: action.payload
			}
		}
		default:
     		return state
	}	
}