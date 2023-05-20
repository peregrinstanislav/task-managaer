import { TranslateService } from "@ngx-translate/core";
import { get } from "lodash";

export function calculateFilterExpression(
  filterValue: any,
  selectedFilterOperation: any,
  property: string
): any[] {
  const getter = (data: any): any => {
    return get(data, property)
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };
  filterValue = filterValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return [getter, selectedFilterOperation || "contains", filterValue];
}

export function calculateFilterExpressionOfTranslatedValue(
  translate: TranslateService,
  translationPrefix: string,
  filterValue: any,
  selectedFilterOperation: any,
  property: string
): any[] {
  const getter = (data: any): any => {
    const value = get(data, property).toString();
    const translation = translate.instant(translationPrefix + value);
    return translation?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  filterValue = filterValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return [getter, selectedFilterOperation || "contains", filterValue];
}

export function calculateSortValue(data: any, property: string): any {
  return get(data, property)
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
