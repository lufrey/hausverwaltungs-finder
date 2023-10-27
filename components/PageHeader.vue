<template>
    <nav class=" flex justify-between items-center">
        <a href="/" class="logo text-xl font-medium tracking-tighter text-main">ApartiFind</a>
        <span class="tagline text-l font-light opacity-50">what's a housing crisis?</span>
        <div class="nav_links flex items-center gap-8">
            <div class="favorites inline-block relative">
                <img src="../assets/heart_outline.svg" alt="Hier sind deine Favorites" class="favorites__image">
                <span class="favorites__counter absolute text-s top">3</span>
            </div>
            <a href="" class="contribute border-2 rounded-full border-primary px-5 py-2">
                <span>Mitwirken</span>
                <img src="../assets/github-mark.svg" alt="Klicke um auf GitHub zu diesem Projekt beizutragen" class="github_logo w-6 ml-2 inline">
            </a>
        </div>
    </nav>
</template>

<style scoped>
    .favorites__counter {
        /* centers the counter in the heart */
        top: 50%;
        left: 50%;
        transform: translate(-50%,-54%);
    }
</style>