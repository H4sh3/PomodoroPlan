import create from 'zustand';
import { combine } from 'zustand/middleware';
import produce from 'immer';
import { Task } from '~/api/calls';

interface State {
    readonly selectedTask: Task | undefined
}

export const useMainStore = create(
    combine(
        {
            selectedTask: undefined,
        } as State,
        (set, get) => ({
            setSelectedTask: (value: Task) => {
                set((state) => produce(state, draftState => {
                    draftState.selectedTask = value
                }));
            },
        })
    )
);
