import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfigService } from "../../../shared/services/app-config.service";
import { Task } from "../models/task-management.model";

@Injectable()
export class TasksService {
  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService
  ) {}

  public getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(
      this.appConfig.settings.apiUrl + "tasks"
    );
  }

  public getTaskDetail(taskId: string): Observable<any> {
    return this.httpClient.get(
      this.appConfig.settings.apiUrl + "tasks/" + taskId
    );
  }

  public insertTask(task: Task): Observable<any> {
    return this.httpClient.post(this.appConfig.settings.apiUrl + "tasks", task);
  }

  public updateTask(task: Task): Observable<any> {
    return this.httpClient.put(
      this.appConfig.settings.apiUrl + "tasks/" + task.id,
      task
    );
  }

  public deleteTask(taskId: string): Observable<any> {
    return this.httpClient.delete(
      this.appConfig.settings.apiUrl + "tasks/" + taskId
    );
  }
}
