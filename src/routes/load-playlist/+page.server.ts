import fetchPlaylist from "$lib/server/fetchPlaylist";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
    const playlistId = url.searchParams.get('list')
    console.log(playlistId);

    if (playlistId) {
        const playlistData = await fetchPlaylist(playlistId);
        if (playlistData.videos.length === 0) throw redirect(300, "/")
        return {playlistData}
    } else {
        throw redirect(300, "/")
    }
}) satisfies PageServerLoad;