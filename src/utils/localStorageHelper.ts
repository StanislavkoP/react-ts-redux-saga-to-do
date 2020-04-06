export class LocalStorageHelper {

    static setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key: string): any {
        const item = localStorage.getItem(key);

        if (item) {
            return JSON.parse(item);
        }

        return null;
    }
}