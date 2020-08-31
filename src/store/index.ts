import { createStore } from "redux";

export enum TodoActionType {
  ADD_TODO_ACTION = "ADD_TODO_ACTION",
  GET_TODO_ACTION = "GET_TODO_ACTION",
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
}

export interface TodoAction extends TodoState {
  type: TodoActionType;
}

export const getTodo = (todos: TodoState) => {
  return {
    type: TodoActionType.GET_TODO_ACTION,
    todos,
  };
};

const initialState: TodoState = {
  todos: [],
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionType.GET_TODO_ACTION:
      console.log(state);
      return {
        ...state,
        todos: action.todos,
      };
    default:
      return state;
  }
};

export const store = createStore(todoReducer);
