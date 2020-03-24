export class Todo {
  constructor(
    public id: number,
    public content: string,
    public isCompeleted: boolean = false
  ) { }
}
