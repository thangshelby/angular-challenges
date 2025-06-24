import { Signal } from '@angular/core';
import { City } from './city.model';
import { Student } from './student.model';
import { Teacher } from './teacher.model';

type ListsType = Signal<City[] | Teacher[] | Student[]>;
export type ListType = City | Teacher | Student;

export interface Store {
  lists: ListsType;

  addAll(list: ListsType): void;

  addOne(list: ListType): void;

  deleteOne(id: number): void;
}
