import { Pipe, PipeTransform } from '@angular/core';

interface Person {
  name: string;
  age: number;
}

@Pipe({
  name: 'wrapFnc',
})
export class WrapFncPipe implements PipeTransform {
  transform(person: Person, index: number): string {
    let res = ``;
    const isFirst = index === 0;

    if (isFirst) {
      res = 'always allowed';
    } else {
      res = person.age > 25 ? 'allowed' : 'declined';
    }
    res = res + ` ${person.name} - ${index}`;

    return res;
  }
}
