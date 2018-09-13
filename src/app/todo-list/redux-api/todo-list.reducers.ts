import { TODOItem } from '@app/shared/models/todo-item';
import { GenericAction } from '@app/store/generic-action';
import { TodoListActionTypes } from '@app/todo-list/redux-api/todo-list.actions';
import { TodoListState } from '@app/todo-list/redux-api/todo-list.state';

const todoItemsLoaded = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, TODOItem[]>
): TodoListState => {
  return {
    ...lastState,
    todos: action.payload
  };
};

const todoItemCreatedReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, TODOItem>
): TodoListState => {
  const prevTodos = lastState.todos;
  prevTodos.push(action.payload);
  const newTodos = prevTodos;
  return {
    ...lastState,
    todos: newTodos
  };
};
const todoItemDeletedReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, string>
): TodoListState => {
  const deleteIdx = lastState.todos.findIndex(
    todo => todo.id === action.payload
  );

  lastState.todos.splice(deleteIdx, 1);

  return { ...lastState };
};
const todoItemUpdatedReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, TODOItem>
): TodoListState => {
  const updatedTodoIdx = lastState.todos.findIndex(
    todo => todo.id === action.payload.id
  );
  lastState.todos[updatedTodoIdx] = action.payload;
  return { ...lastState };
};
const todoItemCompletedReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, string>
) => {

  lastState.todos.find(todo => todo.id === action.payload).completed = true;

  return { ...lastState };
};

export const TodoListReducers = (
  lastState: TodoListState = new TodoListState(),
  action: GenericAction<TodoListActionTypes, any>
): TodoListState => {
  switch (action.type) {
    case TodoListActionTypes.TodoItemsLoaded:
      return todoItemsLoaded(lastState, action);
    case TodoListActionTypes.TodoItemCreated:
      return todoItemCreatedReducer(lastState, action);
    case TodoListActionTypes.TodoItemDeleted:
      return todoItemDeletedReducer(lastState, action);
    case TodoListActionTypes.TodoItemUpdated:
      return todoItemUpdatedReducer(lastState, action);
    case TodoListActionTypes.TodoItemCompleted:
      return todoItemCompletedReducer(lastState, action);

    default:
      return lastState;
  }
};
