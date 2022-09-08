import { atom } from 'nanostores'
import { Task } from '~/api/calls'


export const emptyTask: Task = {
    description: '',
    finished: false,
    uuid: ''
}

export const selectedTask = atom(emptyTask)

export const setSelectedTask = (v: Task) => selectedTask.set(v)