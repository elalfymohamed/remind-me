export interface Todo {
  _id?: string | undefined;
  todo: string;
  color: string;
  completed: boolean;
  install: boolean;
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
