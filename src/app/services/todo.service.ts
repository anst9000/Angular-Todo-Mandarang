import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoTitle = '';
  idForTodo = 4;
  beforeEditCache = '';
  filter = 'all';
  anyRemainingModel = true;
  todos: Todo[] = [
    {
      id: 1,
      title: 'Finish Angular Screencast',
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: 'Conquer the worlds',
      completed: false,
      editing: false,
    },
    {
      id: 3,
      title: 'One more thing',
      completed: false,
      editing: false,
    },
  ];

  constructor() {}

  addTodo(todoTitle: string): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false,
    });

    this.todoTitle = '';
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;

    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => {
      return id !== todo.id;
    });
  }

  remaining(): number {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter((todo) => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  checkAllTodos(evt): void {
    this.todos.forEach((c) => (c.completed = evt.target.checked));

    this.anyRemainingModel = this.anyRemaining();
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter((todo) => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter((todo) => todo.completed);
    }

    return this.todos;
  }
}
