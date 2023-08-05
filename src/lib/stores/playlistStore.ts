import type { Video } from '$lib/types'
import { writable } from 'svelte/store'
import { browser } from '$app/environment';

const localData = browser && localStorage.getItem("videos")
const parsedLocalData = localData && JSON.parse(localData) 

export const playlistData = writable<Video[]>(parsedLocalData || []);

playlistData.subscribe(val => browser && localStorage.setItem("videos", JSON.stringify(val)))
