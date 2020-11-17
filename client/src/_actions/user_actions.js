import axios from 'axios'
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from './types'
export function loginUser(body) {
	const request = axios
		.post('/api/user/login', body)
		.then((response) => response.data)

	return {
		type: LOGIN_USER,
		payload: request,
	}
}

export function registerUser(body) {
	const request = axios
		.post('/api/user/register', body)
		.then((response) => response.data)

	return {
		type: REGISTER_USER,
		payload: request,
	}
}

export function auth() {
	const request = axios.get('/api/user/auth').then((response) => response.data)

	return {
		type: AUTH_USER,
		payload: request,
	}
}
