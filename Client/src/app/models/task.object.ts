export class Task {
  constructor(
    public _id: number = 0,
    public type: string = '',
    public startDate: string = '',
    public finishDate: string = '',
    public completionDate: string = '',
    public duration: number = 1,
    public title: string = '',
    public category: string = '',
    public isLate: boolean = false,
    public taskFinished: boolean = false,
    public taskPercentage: number = 0
  ) {
    this._id = _id;
    this.title = title;
    this.type = type;
    this.category = category;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.completionDate = completionDate;
    this.isLate = isLate;
    this.duration = duration;
    this.taskFinished = taskFinished;
    this.taskPercentage = taskPercentage;
  }
  /*
  convertToTask(response: any[]): Task[] {
    for (let i = 0; i < response.length; i++) {
      response[i] = new Task(response[i]);
    }
    return response;
  }
  */
}
