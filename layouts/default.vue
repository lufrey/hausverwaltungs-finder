<template>
    <div class="max-w-6xl px-4 my-4 mx-auto xl:my-8 flex-row space-y-10">
        <header>
            <PageHeader />
        </header>
        <main>
            <slot />
        </main>
        <footer>
            <PageFooter />
        </footer>
    </div>
</template>