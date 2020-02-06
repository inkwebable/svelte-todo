<script>
	import { afterUpdate } from 'svelte';
	import { storeTodos, lastTodoStoreId } from './TodoStore.js';
	import AddTodo from './AddTodo.svelte';
	import TodoContainer from './TodoContainer.svelte';
	import TodoList from './TodoList.svelte';
	import PageLayout from './PageLayout.svelte';
	
	let store_todos;
	
	const unsubscribe = storeTodos.subscribe(value => {
		store_todos = value;
	});
	
	afterUpdate(() => {
		console.log('store', store_todos);
	});
	
	let todoDesc = '';
	
	const ClearTodoInput = () => {
		todoDesc = '';
	}
	
	const AddTodoItem = (event) => {
		$lastTodoStoreId += 1;
		storeTodos.update(store => {
			store.push({ id: ($lastTodoStoreId), description: event.detail.text, done: false});
			return store;
		});
		ClearTodoInput();
		console.log('AddTodoItem', store_todos, storeTodos);
	}
	
	$: doneTodos = () => {
		return store_todos.filter(todo => todo.done).length;
	}
	
	$: outstandingTodos = () => {
		return store_todos.filter(todo => !todo.done).length;
	}
</script>

<style>
	h1 {
		font-family: sans-serif;
	}
</style>

<PageLayout>
	<h1>
		There { store_todos.length !== 1 ? 'are' : 'is'} {store_todos.length} todo{ store_todos.length !== 1 ? 's' : ''}
	</h1>
	<TodoContainer>
		<TodoList />
	</TodoContainer>
	<AddTodo bind:todoDesc={todoDesc} on:add-todo={AddTodoItem} />
	<p>
		{ doneTodos() } todo{ doneTodos() !== 1 ? 's': ''} completed. { outstandingTodos() } remaining.
	</p>
</PageLayout>
