import type { Video } from '$lib/types'
import { writable } from 'svelte/store'

export const guesses = writable<{correct: Video[], incorrect: Video[]}>({correct: [], incorrect: []});