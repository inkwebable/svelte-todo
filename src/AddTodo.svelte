<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	
	function handleAddTodo(e) {
		if(!e || e.key === 'Enter') {
			dispatch('add-todo', {
				text: todoDesc
			});
		}
	};
	
	export let todoDesc;
</script>

<div>
	<input name='todo'bind:value={todoDesc} type="text" on:keydown={(e) => todoDesc.length > 0 ? handleAddTodo(e) : ''} />
<button on:click={() => todoDesc.length > 0 ? handleAddTodo() : ''} disabled={(todoDesc.length < 1)}>
	Add Todo
</button>
</div>