export interface AppConfig {
  env: {
    production: boolean;
    name: string;
  };
  defaultLanguage: string;
  apiUrl: string;
}
