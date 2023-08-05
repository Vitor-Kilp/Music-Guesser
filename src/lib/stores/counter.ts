import { writable } from 'svelte/store'
import { browser } from '$app/environment'

const localData = browser && localStorage.getItem("counter")
const parsedLocalData = localData ? JSON.parse(localData) : false

export const counterVideo = writable<{total: number, skipped: number, current: number}>(parsedLocalData || {total: 0, skipped: 0, current: 0})

counterVideo.subscribe(val => browser && localStorage.setItem("counter", JSON.stringify(val)))