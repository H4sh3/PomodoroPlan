import axios from 'axios'
import { BACKEND_URL } from './etc'

export const STATUS = {
    SUCCESS: "success"
}

export interface StatusResponse {
    status: string
}

export interface SignUpPayload {
    email: string
    password: string
}

export async function sendSignUp(payload: SignUpPayload): Promise<StatusResponse> {
    return (await axios.post<StatusResponse>(`${BACKEND_URL}/signup`, payload, { withCredentials: true })).data
}

export async function sendSignIn(payload: SignUpPayload): Promise<StatusResponse> {
    return (await axios.post<StatusResponse>(`${BACKEND_URL}/signin`, payload, { withCredentials: true })).data
}

export async function getLoginStatus(): Promise<StatusResponse> {
    return (await axios.get<StatusResponse>(`${BACKEND_URL}/login_check`, { withCredentials: true })).data
}

export async function logout(): Promise<StatusResponse> {
    return (await axios.get<StatusResponse>(`${BACKEND_URL}/logout`, { withCredentials: true })).data
}



const key = "authStatus"
export const authenticated = "authenticated"
export const unauthenticated = "unauthenticated"

const isServer = typeof window === "undefined"

const authStatus = !isServer ? (window.sessionStorage.getItem(key) ? window.sessionStorage.getItem(key) : unauthenticated) : authenticated

export const isLoggedIn = () => authStatus === authenticated

export const authUser = () => window.sessionStorage.setItem(key, authenticated)
export const unauthUser = () => window.sessionStorage.setItem(key, unauthenticated)

// tasks stuff


export interface TaskListResponse extends StatusResponse {
    tasks: Task[]
}

export interface Task {
    description: string,
    uuid?: string,
    finished?: boolean
}

export async function getTaskList(): Promise<TaskListResponse> {
    return (await axios.get<TaskListResponse>(`${BACKEND_URL}/task_list`, { withCredentials: true })).data
}

export async function createNewTask(description: string): Promise<TaskListResponse> {
    return (await axios.post<TaskListResponse>(`${BACKEND_URL}/create_task`, { description }, { withCredentials: true })).data
}

export async function updateTask(uuid: string, options: string[]): Promise<StatusResponse> {
    return (await axios.post<TaskListResponse>(`${BACKEND_URL}/task/${uuid}/update`, { options }, { withCredentials: true })).data
}
