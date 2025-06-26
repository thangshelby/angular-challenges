import { Pipe, PipeTransform } from '@angular/core';

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Pipe({
  name: 'fibonaci',
})
export class FibonaciPipe implements PipeTransform {
  transform(value: number): number {
    return fibonacci(value);
  }
}
