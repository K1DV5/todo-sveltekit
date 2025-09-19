import { crossfade } from 'svelte/transition';

export const [sendKanban, receiveKanban] = crossfade({
    duration: 300
});
