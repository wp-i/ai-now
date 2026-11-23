const pendingLoads = new WeakMap();

export function registerPendingMediaLoad(player, controller) {
  pendingLoads.set(player, controller);
}

export function pauseOtherMedia(active) {
  const pair = active.closest("[data-playback-pair]");
  for (const player of document.querySelectorAll(".audio-output audio, .case-video-frame > video")) {
    if (player === active || (pair?.contains(player) && active.localName !== player.localName)) continue;
    if (!player.paused) player.pause();
    pendingLoads.get(player)?.abort();
  }
}
