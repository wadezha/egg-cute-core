
export class BaseEntity {
  constructor(name: string, values: any) {
    this.name = name;
    this.values = values;
  }
  name: string;
  values: any;
}
