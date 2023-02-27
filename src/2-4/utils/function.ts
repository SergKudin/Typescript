const debug = process.env.DEBUG;

export function log(s: string) {
  if (process.env.DEBUG) console.log(s);
} 