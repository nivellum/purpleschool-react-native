import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { IAuthResponse, ILoginRequest, AuthState } from "./auth.model";
import axios from "axios";
import { AuthAPI } from "../api/endpoints";


const authInitialState: AuthState = {
    accessToken: null,
    isLoading: false,
    error: null,
}

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

export const authAtom = atomWithStorage<AuthState>("auth", authInitialState, storage,);

export const logoutAtom = atom(null, (get, set) => { set(authAtom, authInitialState) })

export const loginAtom = atom(
    null,
    async (get, set, { email, password }: ILoginRequest) => {

        set(authAtom, { ...authInitialState, isLoading: true } satisfies AuthState);

        try {
            const { data }: { data: IAuthResponse } = await axios.post(AuthAPI.login, { email, password });

            console.log(data.accessToken);

            set(authAtom, {
                ...authInitialState,
                accessToken: data.accessToken
            });

        } catch (e: any) {

            set(authAtom, {
                ...authInitialState,
                error: e?.message ?? e
            } satisfies AuthState);
        }
    });


