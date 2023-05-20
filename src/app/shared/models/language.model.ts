export interface Language {
  language: string;
  code: string;
  type: string;
  icon: string;
}

export enum LanguageCodes {
  EN = "en",
  SK = "sk",
}

export const languages: Language[] = [
  {
    language: "English",
    code: "en",
    type: "US",
    icon: "us",
  },
  {
    language: "Slovensky",
    code: "sk",
    type: "SK",
    icon: "sk",
  },
];
