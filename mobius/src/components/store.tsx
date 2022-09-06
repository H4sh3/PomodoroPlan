import create from 'zustand';
import { combine } from 'zustand/middleware';
import produce from 'immer';

interface State {
    authStatus: string
}

export const useMainStore = create(
    combine(
        {
            authStatus: ''
        } as State,
        (set, get) => ({
            setAuthStatus: (value: string) => {
                set((state) => produce(state, draftState => {
                    draftState.authStatus = value
                }));
            },
            isLoggedIn: () => {
                return get().authStatus === 'authenticated'
            }
        })
    )
);