<script lang="ts">
    export let title = "btn title";
    export let loader = false;
    export let loader_title = "loader title";
    export let color = "bg-blue-500";
</script>

<button class="w-full {color} transition-all active:scale-95 hover:opacity-70 active:font-semibold px-2 py-1"
disabled={loader}
on:click
>
    {#if loader}
        <div class="flex items-center gap-2 justify-center">
            <p>{loader_title}</p>
            <div class="w-4 h-4 border-2 border-b-slate-500 rounded-full animate-spin"></div>
        </div>
    {:else}
        <p>{title}</p>
    {/if}
</button>