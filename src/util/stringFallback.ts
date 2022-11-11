export default function stringFallback(fallback: string, ...strings: (string | undefined)[]) : string {
    for(let str of strings) {
        if(str) return str;
    }
    return fallback;
}