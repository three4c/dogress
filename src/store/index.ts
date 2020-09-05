import { createStore } from "redux";

export enum TodoActionType {
  GET_TODO_ACTION = "GET_TODO_ACTION",
  ADD_TODO_ACTION = "ADD_TODO_ACTION",
  SELECT_TODO_ACTION = "SELECT_TODO_ACTION",
}

export interface TodoState {
  id: number;
  deadline: number;
  description: string;
  today: boolean;
  doneTime: string;
  progress: number;
}

export interface GlobalState {
  /** Todoのデータ構造 */
  todos: TodoState[];
  /** 残り */
  remaining: TodoState[];
  /** 完了 */
  done: TodoState[];
  /** 進行中 */
  progress: TodoState[];
  /** 選択されたTodoのKey */
  todoKey: { [key: string]: number };
  /** 選択されたTodoのID */
  todoId: number;
  /** Todoが追加・削除等の動きがあった場合に変化 */
  todoFlag: boolean;
}

export interface TodoAction extends GlobalState {
  type: TodoActionType;
}

export const getTodo = (todos: GlobalState["todos"]) => {
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

export const selectTodo = (todoId: GlobalState["todoKey"]) => {
  return {
    type: TodoActionType.SELECT_TODO_ACTION,
    todoId,
  };
};

const initialState: GlobalState = {
  todos: [],
  remaining: [],
  done: [],
  progress: [],
  todoKey: { "": 0 },
  todoId: 0,
  todoFlag: false,
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): GlobalState => {
  switch (action.type) {
    case TodoActionType.GET_TODO_ACTION:
      return {
        ...state,
        remaining: [...action.todos.filter((item) => item.today)],
        done: [...action.todos.filter((item) => item.doneTime)],
        progress: [
          ...action.todos.filter((item) => !item.today && !item.doneTime),
        ],
      };
    case TodoActionType.ADD_TODO_ACTION:
      return {
        ...state,
        todoFlag: !action.todoFlag,
      };
    case TodoActionType.SELECT_TODO_ACTION:
      return {
        ...state,
        todoId:
          state[
            Object.keys(action.todoId)[0] as "remaining" | "done" | "progress"
          ][Object.values(action.todoId)[0]].id,
      };
    default:
      return state;
  }
};

export const store = createStore(todoReducer);
