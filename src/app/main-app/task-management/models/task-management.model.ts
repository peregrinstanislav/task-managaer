export interface Task {
    _id?: string;
    name: string;
    type: TaskType;
    fields: any;
}

export enum TaskType {
    WASH_DISHES = 'wash-dishes',
    VACUUM_CLEAN = 'vacuum-clean'
}
