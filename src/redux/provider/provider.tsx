"use client";

import { Provider } from "react-redux";
import store from "../store/store";
import GetSessionStorage from "./get-session-storage/get-session-storage";
import ProtectedAuth from "@/components/global/ProtectedAuth/ProtectedAuth";

interface ReduxProviderProps {
    children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <GetSessionStorage>
                <ProtectedAuth>{children}</ProtectedAuth>
            </GetSessionStorage>
        </Provider>
    );
}
