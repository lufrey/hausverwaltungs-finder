<template>
    <div class="max-w-6xl mx-auto my-8 flex-row space-y-10">
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