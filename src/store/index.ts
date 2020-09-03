import { createStore } from "redux";

export enum TodoActionType {
  GET_TODO_ACTION = "GET_TODO_ACTION",
  ADD_TODO_ACTION = "ADD_TODO_ACTION",
  SELECT_TODO_ACTION = "SELECT_TODO_ACTION",
}

export interface TodoState {
  /** Todoのデータ構造 */
  todos: {
    id: number;
    deadline: number;
    description: string;
    today: boolean;
    doneTime: string;
    progress: number;
  }[];
  /** 選択されたTodoのID */
  todoId: number;
  /** Todoが追加・削除等の動きがあった場合に変化 */
  todoFlag: boolean;
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

export const addTodo = () => {
  return {
    type: TodoActionType.ADD_TODO_ACTION,
  };
};

export const selectTodo = (todoId: TodoState["todoId"]) => {
  return {
    type: TodoActionType.SELECT_TODO_ACTION,
    todoId,
  };
};

const initialState: TodoState = {
  todos: [],
  todoId: 0,
  todoFlag: false,
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
    case TodoActionType.ADD_TODO_ACTION:
      return {
        ...state,
        todoFlag: !action.todoFlag,
      };
    case TodoActionType.SELECT_TODO_ACTION:
      console.log("hogehoge", action.todoId);
      return {
        ...state,
        todoId: action.todoId,
      };
    default:
      return state;
  }
};

export const store = createStore(todoReducer);
