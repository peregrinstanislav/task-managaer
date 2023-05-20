import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JsonForm, JsonFormControls } from "../models/form-controls.model";
import { lastValueFrom } from "rxjs";
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Task } from "../../main-app/task-management/models/task-management.model";
import { get, set } from "lodash";

@Injectable({ providedIn: "root" })
export class JsonFormService {
  private jsonForm!: JsonForm;

  constructor(private httpClient: HttpClient) {}

  loadJsonForm(): Promise<JsonForm> {
    const jsonFile = `assets/form.json`;
    return new Promise<JsonForm>((resolve, reject) => {
      lastValueFrom(this.httpClient.get(jsonFile))
        .then((response: any) => {
          this.jsonForm = response as JsonForm;
          resolve(this.jsonForm);
        })
        .catch((response: any) => {
          reject(
            `Could not load form json '${jsonFile}': ${JSON.stringify(
              response
            )}`
          );
        });
    });
  }

  createForm(
    jsonFormControls: JsonFormControls[],
    selectedTask: Task,
    formBuilder: FormBuilder
  ): FormGroup {
    const formGroup = formBuilder.group({});
    for (const control of jsonFormControls) {
      const validators = this.createValidators(control);
      const value = selectedTask ? get(selectedTask, control.objectPath) : "";
      formGroup.addControl(
        control.name,
        formBuilder.control(value, validators)
      );
    }
    return formGroup;
  }

  getFormControls(selectedType: string): JsonFormControls[] {
    const formType = this.jsonForm.forms.find((f) => f.key === selectedType);
    if (formType) {
      return formType.formControls;
    }
    return [];
  }

  getFormTypes(): string[] {
    return this.jsonForm.forms.map((form) => form.key);
  }

  getFormData(
    jsonFormControls: JsonFormControls[],
    formGroup: FormGroup,
    task: Partial<Task>
  ): Task {
    for (const control of jsonFormControls) {
      let value = formGroup.value[control.name];
      if (control.type === "number") {
        value = Number(value);
      }
      const path = control.objectPath;
      set(task, path, value);
    }
    return task as Task;
  }

  private createValidators(control: JsonFormControls): AbstractControlOptions {
    const validatorsToAdd = [];
    for (const [key, value] of Object.entries(control.validators)) {
      switch (key) {
        case "min":
          validatorsToAdd.push(Validators.min(value));
          break;
        case "max":
          validatorsToAdd.push(Validators.max(value));
          break;
        case "required":
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
          break;
        case "requiredTrue":
          if (value) {
            validatorsToAdd.push(Validators.requiredTrue);
          }
          break;
        case "email":
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
          break;
        case "minLength":
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case "maxLength":
          validatorsToAdd.push(Validators.maxLength(value));
          break;
        case "pattern":
          validatorsToAdd.push(Validators.pattern(value));
          break;
        case "nullValidator":
          if (value) {
            validatorsToAdd.push(Validators.nullValidator);
          }
          break;
        default:
          break;
      }
    }
    return validatorsToAdd as AbstractControlOptions;
  }
}
