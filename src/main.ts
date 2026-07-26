import { startBomberman } from "./game/bomberman";

const canvas = document.getElementById("game") as HTMLCanvasElement | null;

if (canvas) {
  startBomberman(canvas);
}

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(console.error);
  });
}
