<template>
  <div
    class="my-4 max-w-6xl flex-row space-y-10 px-4 font-poppins md:mx-10 xl:mx-auto xl:my-8"
  >
    <header>
      <PageHeader />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <!-- <PageFooter /> -->
    </footer>
  </div>
</template>
