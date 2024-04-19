const rControl = /[\u0000-\u001f]/g;
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g;
const rCombining = /[\u0300-\u036F]/g;
export const slugify = (str) => str.normalize("NFKD").replace(rCombining, "").replace(rControl, "").replace(rSpecial, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();