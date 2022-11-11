import { TablePosition } from "./types";

export default function positionEquals(a: TablePosition | undefined, b: TablePosition | undefined): boolean {
    if (!a || !b) {
        return false;
    }
    return a.dotw === b.dotw && a.y === b.y;
}
