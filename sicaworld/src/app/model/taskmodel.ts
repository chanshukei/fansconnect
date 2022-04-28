export interface TaskModel {
  taskId: number;
  idolId: number;
  taskType: string;
  taskName: string;
  taskDescription: string;
  startDate: Date;
  endDate: Date;
  videoName: string;
  videoUrl: string;
  point: number;
}
