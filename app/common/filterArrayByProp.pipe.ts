import { Pipe, PipeTransform } from '@angular/core';

let separator: RegExp = /\s*[\,\uff0c]\s*/;

@Pipe({
    name: 'arrayFilter'
})
export class ArrayFilter implements PipeTransform {
    transform(array: any[], prop: string, values: any): any {
        if (!prop || !values) {
            return array;
        }
        if (array && array.length) {
            let valueArray: string[] = (values as string).split(separator);
            return array.filter(item => {
                var isInclude = false;
                valueArray.forEach(v => {
                    if (v && item[prop] && item[prop].includes(v)) {
                        isInclude = true;
                    }
                });
                return isInclude;
            });
        } else {
            return [];
        }
    }
}