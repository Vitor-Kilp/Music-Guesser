import type { Video } from '$lib/types'
import { writable } from 'svelte/store'
import { browser } from '$app/environment'

const localData = browser && localStorage.getItem("guesses")
const parsedLocalData = localData && JSON.parse(localData) 

export const guesses = writable<{ correct: Video[], incorrect: Video[]}>(parsedLocalData ||{correct: [], incorrect: []});

guesses.subscribe(val => browser && localStorage.setItem("guesses", JSON.stringify(val)))