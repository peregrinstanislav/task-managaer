import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../common-services/app-config.service';
import { AppConfig } from 'src/app/common-models/config.model';
import { Task } from '../models/task-management.model';

@Injectable({ providedIn: 'root' })
export class TasksService {

    private config: AppConfig;

    constructor(
        private httpClient: HttpClient
    ) {
        this.config = AppConfigService.settings;
    }

    /**
     * Get tasks from api
     */
    public getTasks(): Observable<any> {
        return this.httpClient.get(this.config.apiUrl + 'tasks');
    }

    /**
     * Get task detail
     */
    public getTaskDetail(taskId: string): Observable<any> {
        return this.httpClient.get(this.config.apiUrl + 'tasks/' + taskId);
    }

    /**
     * Insert task to backend
     */
    public insertTask(task: Task): Observable<any> {
        return this.httpClient.post(this.config.apiUrl + 'tasks', task);
    }

    /**
     * Update task on backend
     */
    public updateTask(task: Task): Observable<any> {
        return this.httpClient.put(this.config.apiUrl + 'tasks/' + task._id, task);
    }

    /**
     * Delete task from backend
     */
    public deleteTask(taskId: string): Observable<any> {
        return this.httpClient.delete(this.config.apiUrl + 'tasks/' + taskId);
    }

    private getHeaders(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            })
        };
    }
}