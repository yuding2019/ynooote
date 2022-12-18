export function random(min: number, max: number, includeMax: boolean = false) {
  return Math.floor(Math.random() * (max - min + Number(includeMax))) + min;
}

export function isBrowser() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

export function isPC() {
  if (!isBrowser()) {
    return false;
  }

  const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/gi);
  const isMobile =
    isIOS ||
    navigator.userAgent.match(/Android|BlackBerry|Opera Mini|IEMobile/gi);
  return !isMobile;
}
