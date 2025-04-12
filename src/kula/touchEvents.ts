// touchEvents.js
export function initTouchEvents(): void {
  function touchToMouse(eventType: string, touchEvent: TouchEvent): void {
    if (touchEvent.touches.length > 0) {
      const touch = touchEvent.touches[0];
      const mouseEvent = new MouseEvent(eventType, {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: true,
        cancelable: true,
      });
      (touchEvent.target as HTMLElement).dispatchEvent(mouseEvent);
    }
  }

  ['touchstart', 'touchmove', 'touchend'].forEach((type) => {
    window.addEventListener(type, (e: TouchEvent) => {
      const mappedType =
        type === 'touchstart'
          ? 'mousedown'
          : type === 'touchmove'
          ? 'mousemove'
          : 'mouseup';

      touchToMouse(mappedType, e);
      e.preventDefault();
    }, { passive: false });
  });
}
