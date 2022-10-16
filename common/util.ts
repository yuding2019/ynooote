export function random(min: number, max: number, includeMax: boolean = false) {
  return Math.floor(Math.random() * (max - min + Number(includeMax))) + min;
}
