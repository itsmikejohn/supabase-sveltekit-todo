<script lang="ts">
	import Button from "$lib/Components/Button.svelte";
	import DeleteHandler from "$lib/Components/DeleteHandler.svelte";
	import { slide } from "svelte/transition";

	import { supabase } from "$lib/supabase";
	import type { TodoValue } from "$lib/types";

	const dsComp = {
		todos: <any[] | null> [],
		loader: false,
		addValue: "",
		showUpdate: false,
		comparison: 0.1,
		deleteLoader: false,

		updateValue: "",
	}

	const resursiveCall = async () =>
	{
		try {
			const { data } = await supabase.from("todos").select("*");
			dsComp.todos = data;
		} catch (error) {
			console.log(error);
		}
	}
	resursiveCall();

	const addHandler = async () =>
	{	
		dsComp.loader = true;
		try {
			const { data } = await supabase.from("todos").upsert({activity: dsComp.addValue}).select();
			resursiveCall();
			dsComp.loader = false;
			dsComp.addValue = "";
		} catch (error) {
			console.log(error);
			dsComp.loader = false;
			dsComp.addValue = "";
		}
	}

	const deleteHandler = async (todoValue: TodoValue) =>
	{
		try {
			const {error} = await supabase.from("todos").delete().eq("activity", todoValue.activity);
			resursiveCall();
		} catch (error) {
			console.log(error);

		}
		
	}

	const updateHandler = async (todoValue: TodoValue) =>
	{
		try {
			const { data, error } = await supabase.from("todos").update({activity: dsComp.updateValue}).eq("activity", todoValue.activity);
			resursiveCall();
			dsComp.comparison = 0.1;
			dsComp.updateValue = "";
		} catch (error) {
			console.log(error);
		}
	}

</script>

<main class="sm:max-w-2xl mx-auto p-5 sm:p-0 flex flex-col gap-2">

	<h1 class="h2 text-center">Mikey Fullstack Todo App</h1>
	<p>This project is uploaded by:</p>
	<button class="max-w-fit text-left text-blue-600 transition-all hover:underline active:scale-95"
	on:click={() => window.open("https://www.youtube.com/@MikeSharesCode")}
	>https://www.youtube.com/@MikeSharesCode</button>
	<button class="max-w-fit text-left text-blue-600 transition-all hover:underline active:scale-95"
	on:click={() => window.open("https://www.youtube.com/watch?v=3NlOJnm19X8")}
	>https://www.youtube.com/watch?v=3NlOJnm19X8</button>
	<section class="flex flex-col gap-2">
		<input type="text" placeholder="Enter data to send in database" class="input w-full" 
		bind:value={dsComp.addValue}/>

		<div class="max-w-fit">
			<Button title="Add data" 
			on:click={addHandler} 
			loader={dsComp.loader} 
			loader_title="Relax"
		/>

		</div>
	</section>
	{#if dsComp.todos === null}
		<p>There is something wrong!!</p>
	{:else}
		{#each dsComp.todos as todo, index}
			<div class="card p-2" in:slide>
				<p class="text-red-500">{new Date(todo.created_at).toLocaleDateString() + ", " + new Date(todo.created_at).toLocaleTimeString() }</p>
				<section class="flex">
					<div class="w-full"></div>
					<div class="flex gap-2">
						<Button color="bg-green-500" title="ShowUpdate" on:click={() => dsComp.comparison = index}/>
						<DeleteHandler {todo} {resursiveCall}/>
						{#if dsComp.comparison === index}
							<div class="card p-2 flex flex-col gap-2 absolute mt-10">
								<textarea class="textarea w-full p-2" bind:value={dsComp.updateValue}/>
								<section class="flex">
									<div class="flex gap-2">
										<Button color="bg-green-500" title="Update" on:click={() => updateHandler(todo)}/>
										<Button color="bg-red-500" title="Cancel" on:click={() => dsComp.comparison = 0.1}/>
									</div>
									<div class="w-full"></div>
								</section>
							</div>
						{/if}
					</div>
				</section>
				<p>{todo.activity}</p>
			</div>
		{/each}
	{/if}
	
</main>
