declare global {
    interface Array<T> {
        last(): any;
        unique(): boolean;
        toObject(field?: string): any;
        toObjectGrouped(): any[];
    }
    interface ArrayConstructor {
        create(): any[];
    }
}
declare global {
    interface NumberConstructor {
        isNumeric(n: number): boolean;
    }
    interface Number {
        padStart(num: number, pad: number | string): any;
    }
}
declare global {
    interface Object {
        objectMap(a: any): any;
        objectReduce(a: any): any;
        mergeMutable(): any;
        objectSize(): number;
        toQueryString(): string;
        without(any: any): Object;
    }
}
declare global {
    interface String {
        pluralize(counter?: number): string;
        crop(size: number, end?: string): string;
        slugify(): string;
        ensureSlashStart(): string;
        toCamelCase(): string;
        toPascalCase(): string;
        toJSONObject(): object;
    }
}
