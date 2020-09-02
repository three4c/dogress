import { createStore } from "redux";

export enum TodoActionType {
  GET_TODO_ACTION = "GET_TODO_ACTION",
  ADD_TODO_ACTION = "ADD_TODO_ACTION",
}

export interface TodoState {
  todos: {
    id: number;
    deadline: number;
    description: string;
    today: boolean;
    doneTime: string;
    progress: number;
  }[];
  todo: {
    deadline: number;
    description: string;
    createdOn: string;
    doneTime: string;
    progress: number;
  };
}

export interface TodoAction extends TodoState {
  type: TodoActionType;
}

export const getTodo = (todos: TodoState["todos"]) => {
  return {
    type: TodoActionType.GET_TODO_ACTION,
    todos,
  };
};

export const addTodo = (todo: TodoState["todo"]) => {
  return {
    type: TodoActionType.ADD_TODO_ACTION,
    todo,
  };
};

const initialState: TodoState = {
  todos: [],
  todo: {
    deadline: 0,
    description: "",
    createdOn: "",
    doneTime: "",
    progress: 0,
  },
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionType.GET_TODO_ACTION:
      return {
        ...state,
        todos: [...action.todos],
      };
    default:
      return state;
  }
};

export const store = createStore(todoReducer);
