import { atom } from "jotai";
import { User } from "./user.model";

export const userAtom = atom<UserState>({
    profile: null,
    isLoading: false,
    error: null
});

export interface UserState {
    profile: User | null;
    isLoading: boolean;
    error: string | null;
}