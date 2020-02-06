import { writable } from 'svelte/store';

export const storeTodos = writable([{ id: 0, description: 'do todo', done: true}]);
export const lastTodoStoreId = writable(0);