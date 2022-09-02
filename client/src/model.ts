export interface Todo {
  id: number;
  todo: string;
  color: string;
  idDone: boolean;
  isInstall: boolean;
}

export interface IsData {
  todo: string;
  color: string;
  install: boolean;
}

export interface Form_Data {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}
