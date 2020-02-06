<script>
	import { storeTodos } from './TodoStore.js';
	import TodoItem from './TodoItem.svelte';
	import RemoveTodo from './RemoveTodo.svelte';
	import { findIndexById } from './utils.js';
	
	let store_todos;
	
	const unsubscribe = storeTodos.subscribe(value => {
		store_todos = value;
	});
	
	function RemoveTodoItem(event) {
		const { id } = event.detail;
		const todoIndex = findIndexById(store_todos, id);
		storeTodos.update(store => {
			store.splice(todoIndex, 1);
			return store;
		});
	}
	
	function ChangeTodoDone(event) {
		const {id} = event.detail;
		// faster
		const todoIndex = findIndexById(store_todos, id);
		storeTodos.update(store => {
			store[todoIndex].done = !store[todoIndex].done;
			return store;
		});
		
		// slower
		//console.time('change');
		//storeTodos.update(store => {
			//store = store.map(todo => {
				//if(id === todo.id) {
					//console.log('match', id);
					//todo.done = !todo.done;
				//}
				//return todo;
			//});
			
			//return store;
		//});
		//console.timeEnd('change');
	}
	
</script>

<style>
	.todo-group {
		width: 100%;
		margin: 0;
	}
	
	.todo-container-li {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		list-style: none;
	}
	
	.todo {
		display: flex;
		justify-content: space-between;
	}
</style>


{#if store_todos.length > 0}
	<ul class="todo-group">
	{#each store_todos as todo}
		<li class="todo-container-li">
			<div class:todo>
				<TodoItem todo={todo} on:change-todo-done={ChangeTodoDone} />
				<RemoveTodo todo={todo} on:remove-todo-item={RemoveTodoItem} />
			</div>
		</li>
	{/each}
	</ul>
{:else}
	<p style="color: grey; font-size: 10px;">
		(Add some todos!)
	</p>
{/if}
