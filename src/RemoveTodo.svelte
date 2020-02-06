<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	
	function handleRemoveTodo(e) {
		console.log('handleRemoveTodo', e);
		dispatch('remove-todo-item', {
			id: todo.id
		})
	};
	
	export let todo;
</script>

<style>
	.remove-todo {
		cursor: pointer;
		color: red;
	}
</style>

<span class="remove-todo" on:click={handleRemoveTodo}>X</span>