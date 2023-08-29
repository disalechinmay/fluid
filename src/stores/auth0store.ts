import type { Auth0Client, User } from "@auth0/auth0-spa-js";
import { writable } from "svelte/store";

export const auth0Client = writable<Auth0Client | null>(null);
export const isAuthenticated = writable<boolean>(false);
export const user = writable<User | undefined | null>(null);
export const popupOpen = writable<boolean>(false);
export const error = writable<any>();
