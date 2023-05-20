export interface Task {
  id?: string;
  name: string;
  type: string;
  fields: any;
}

export interface TaskManagement {
  tasks: Task[];
}
