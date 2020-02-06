<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	
	function handleChangeTodoDone(id) {
		dispatch('change-todo-done', {
			id: id
		});
	}
	
	export let todo = {};
</script>

<style>
	.completed {
		text-decoration: line-through;
	}
</style>

<div class:completed={todo.done}>
	<input name={todo.id} type="checkbox" checked={todo.done} on:change={handleChangeTodoDone(todo.id)} />
	{todo.description}
</div>