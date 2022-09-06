import axios from 'axios'

const BACKEND_URL = 'http://localhost:8000'

export interface StatusResponse {
    status: string
}

export interface SignUpPayload {
    email: string
    password: string
}

export async function sendSignUp(payload: SignUpPayload): Promise<StatusResponse> {
    return (await axios.post<StatusResponse>(`${BACKEND_URL}/signin`, payload, { withCredentials: true })).data
}

export async function getLoginStatus(): Promise<StatusResponse> {
    return (await axios.get<StatusResponse>(`${BACKEND_URL}/login_check`, { withCredentials: true })).data
}