export function random(min: number, max: number, includeMax: boolean = false) {
  return Math.floor(Math.random() * (max - min + Number(includeMax))) + min;
}

export function isBrowser() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export function isPC() {
  if (!isBrowser()) {
    return false;
  }

  return !isMobile();
}

export function isMobile() {
  if (!isBrowser()) {
    return false;
  }

  const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/gi);
  return (
    isIOS ||
    navigator.userAgent.match(/Android|BlackBerry|Opera Mini|IEMobile/gi)
  );
}

export function randomId() {
  return Math.random().toString(36).substring(2);
}
