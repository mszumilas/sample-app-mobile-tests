export class ArraysHelper {

    static isSortedAsc(arr: string[]): boolean {
        const sorted = [...arr].sort((a, b) => a.localeCompare(b));
        return arr.every((val, i) => val === sorted[i]);
    }

    static isSortedDesc(arr: string[]): boolean {
        const sorted = [...arr].sort((a, b) => b.localeCompare(a));
        return arr.every((val, i) => val === sorted[i]);
    }

    static isSortedNumberAsc(arr: number[]): boolean {
        const sorted = [...arr].sort((a, b) => a - b);
        return arr.every((val, i) => val === sorted[i]);
    }

    static isSortedNumberDesc(arr: number[]): boolean {
        const sorted = [...arr].sort((a, b) => b - a);
        return arr.every((val, i) => val === sorted[i]);
    }
}
