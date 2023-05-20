import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Task, TaskManagement } from "../models/task-management.model";
import { TasksService } from "../services/tasks.service";
import { switchMap } from "rxjs";

@Injectable()
export class TaskManagementStore extends ComponentStore<TaskManagement> {
  tasks$ = this.select((state) => state.tasks);

  fetchTasks = this.updater((state, tasks: Task[]) => ({
    ...state,
    tasks: tasks,
  }));

  addTask = this.updater((state, task: Task) => ({
    ...state,
    tasks: [...state.tasks, task],
  }));

  deleteTask = this.updater((state, id: string) => ({
    ...state,
    tasks: state.tasks.filter((v) => v.id !== id),
  }));

  updateTask = this.updater((state, task: Task) => ({
    ...state,
    tasks: state.tasks.map((d) => (d.id === task.id ? task : d)),
  }));

  fetch = this.effect(($) =>
    $.pipe(
      switchMap(() =>
        this.taskService.getTasks().pipe(
          tapResponse(
            (values: any) => this.fetchTasks(values),
            (error) => console.log(error)
          )
        )
      )
    )
  );

  insert = this.effect(($) =>
    $.pipe(
      switchMap((task: any) =>
        this.taskService.insertTask(task).pipe(
          tapResponse(
            (res) => this.addTask(res),
            (error) => console.log(error)
          )
        )
      )
    )
  );

  delete = this.effect(($) =>
    $.pipe(
      switchMap((id: any) =>
        this.taskService.deleteTask(id).pipe(
          tapResponse(
            () => this.deleteTask(id),
            (error) => console.log(error)
          )
        )
      )
    )
  );

  update = this.effect(($) =>
    $.pipe(
      switchMap((task: any) =>
        this.taskService.updateTask(task).pipe(
          tapResponse(
            (res) => this.updateTask(res),
            (error) => console.log(error)
          )
        )
      )
    )
  );

  constructor(private taskService: TasksService) {
    super({ tasks: [] });
  }
}
