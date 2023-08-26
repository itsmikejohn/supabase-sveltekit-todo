<script lang="ts">
    import { supabase } from "$lib/supabase";

    import { staticState } from "$lib/stores";
	import Button from "./Button.svelte";
    import type { TodoValue } from "$lib/types";

    export let todo: TodoValue;
    export let resursiveCall: any;

    const dsComp = {
        loader: false,
    }

    const deleteHandler = async () =>
    {
        dsComp.loader = true;
        $staticState.deleteCompare = todo.id;
        try {
			const {error} = await supabase.from("todos").delete().eq("activity", todo.activity).eq("id", todo.id);
            dsComp.loader = false;
			resursiveCall();
		} catch (error) {
			console.log(error);
            dsComp.loader = false;
		}
    }

</script>

<Button color="bg-red-500" title="Delete" loader={dsComp.loader} loader_title="Deleting" on:click={deleteHandler}/>