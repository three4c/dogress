import { createStore } from "redux";

export enum TodoActionType {
  SET_TODO_ACTION = "SET_TODO_ACTION",
  GET_TODO_ACTION = "GET_TODO_ACTION",
  ADD_TODO_ACTION = "ADD_TODO_ACTION",
  SELECT_TODO_ACTION = "SELECT_TODO_ACTION",
  DELETE_TODO_ACITON = "DELETE_ACTION_TODO",
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
  /** Todoの単体データ構造 */
  todo: TodoState;
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
}

export interface TodoAction extends GlobalState {
  type: TodoActionType;
}

export const setTodo = (todos: GlobalState["todos"]) => {
  return {
    type: TodoActionType.SET_TODO_ACTION,
    todos,
  };
};

export const getTodo = () => {
  return {
    type: TodoActionType.GET_TODO_ACTION,
  };
};

export const addTodo = (todo: GlobalState["todo"]) => {
  return {
    type: TodoActionType.ADD_TODO_ACTION,
    todo,
  };
};

export const selectTodo = (todoKey: GlobalState["todoKey"]) => {
  return {
    type: TodoActionType.SELECT_TODO_ACTION,
    todoKey,
  };
};

export const deleteTodo = () => {
  return {
    type: TodoActionType.DELETE_TODO_ACITON,
  };
};

const initialState: GlobalState = {
  todo: {} as TodoState,
  todos: [],
  remaining: [],
  done: [],
  progress: [],
  todoKey: { "": 0 },
  todoId: 0,
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): GlobalState => {
  switch (action.type) {
    case TodoActionType.SET_TODO_ACTION:
      return {
        ...state,
        todos: [...action.todos],
      };
    case TodoActionType.GET_TODO_ACTION:
      return {
        ...state,
        remaining: [
          ...state.todos.filter((item) => item.today && !item.doneTime),
        ],
        done: [...state.todos.filter((item) => item.doneTime)],
        progress: [
          ...state.todos.filter((item) => !item.today && !item.doneTime),
        ],
      };
    case TodoActionType.ADD_TODO_ACTION:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case TodoActionType.SELECT_TODO_ACTION:
      return {
        ...state,
        todoKey: action.todoKey,
        todoId:
          state[
            Object.keys(action.todoKey)[0] as "remaining" | "done" | "progress"
          ][Object.values(action.todoKey)[0]].id,
      };
    case TodoActionType.DELETE_TODO_ACITON:
      return {
        ...state,
        todos: [...state.todos.filter((item) => item.id !== state.todoId)],
      };
    default:
      return state;
  }
};

export const store = createStore(todoReducer);
