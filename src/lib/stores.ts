import { writable } from "svelte/store";

export const staticState = writable({
    deleteCompare: 0.1,
})