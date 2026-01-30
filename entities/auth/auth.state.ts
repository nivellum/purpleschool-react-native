import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage } from "jotai/utils";

const authInitialState: AuthState = {
    access_token: null,
    isLoading: false,
    error: null,
}

// const authAtom = atomWithStorage<AuthState>("auth", authInitialState, AsyncStorage, 

export interface AuthState {
    access_token: string | null;
    isLoading: boolean;
    error: string | null;
}

