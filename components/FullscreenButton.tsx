"use client";

import { FullscreenIcon } from "./Icons";

export default function FullscreenButton({ iframeRef }: { iframeRef: React.RefObject<HTMLIFrameElement | null> }) {
  const handleFullscreen = () => {
    const el = iframeRef.current;
    if (!el) return;

    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen();
    }
  };

  return (
    <button
      onClick={handleFullscreen}
      className="sketch-btn text-xs md:text-sm px-5 py-2.5 group"
    >
      <FullscreenIcon className="w-4 h-4" />
      <span className="hidden sm:inline">Fullscreen</span>
    </button>
  );
}
