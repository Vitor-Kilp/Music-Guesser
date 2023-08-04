import type { Video } from "$lib/types";
import { API_KEY } from "$env/static/private";

type playlistInfo = {
    items: [
        {
            id: string,
            snippet: {
                channelId: string,
                title: string,
                channelTitle: string
            }
        }
    ]
}

type playlistItems = {
    kind: "youtube#playlistItem",
    id: string,
    snippet: {
        //publishedAt: datetime,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string,
                width: number,
                height: number
            } | undefined
        },
        channelTitle: string,
        playlistId: string,
        position: number,
        resourceId: {
            kind: string,
            videoId: string,
        }
    },
    contentDetails: {
        videoId: string,
        startAt: string,
        endAt: string,
        note: string
    },
    status: {
        privacyStatus: string
    }

}

export default async function fetchPlaylist(playlistId: string): Promise<{ videos: Video[]; info: playlistInfo | null; }> {
    const apiKey = API_KEY;
    const maxResults = 50;
    let nextPageToken: string | undefined = undefined; // Token for pagination

    let videos: Video[] = [];

    try {
        while (videos.length < 250) {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}${nextPageToken ? "&pageToken=" + nextPageToken : ""}`
            );

            if (!response.ok) {
                throw new Error('Failed to retrieve playlist videos');
            }

            const data = await response.json();

            const fetchedVideos: Video[] = []
            for (const item of data.item) {
                if (item.snippet.title != 'Deleted video' && item.snippet.title != 'Private video') {
                    fetchedVideos.push({
                        id: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnail: item.snippet.thumbnails.default?.url && "",
                    })
                }
            };

            videos = videos.concat(fetchedVideos);

            if (data.nextPageToken) {
                nextPageToken = data.nextPageToken;
            } else {
                break; // No more pages, exit the loop
            }
        }

        const playlistInfo = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${apiKey}&id=${playlistId}&part=id,snippet&fields=items(id,snippet(title,channelId,channelTitle))`)
        const parsedInfo = await playlistInfo.json()
        return { videos: videos, info: parsedInfo };
    } catch (error) {
        console.error('Error retrieving playlist videos:', error);
        return { videos: [], info: null };
    }
}