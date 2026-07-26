export function startBomberman(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Game state is pure data, no DOM injection
  const tileSize = 32;
  const cols = canvas.width / tileSize;
  const rows = canvas.height / tileSize;

  // Simple loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // TODO: draw grid, player, bombs, explosions
    requestAnimationFrame(loop);
  }

  loop();
}
