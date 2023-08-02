import type { Video } from '$lib/types'
import { writable } from 'svelte/store'

export const playlistData = writable<Video[]>([]);
