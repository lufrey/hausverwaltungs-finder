<template>
  <LoadingIndicator />
  <div
    class="mx-auto flex h-full max-w-6xl flex-col gap-10 px-4 pt-4 font-poppins md:px-14 xl:pt-8"
  >
    <header>
      <PageHeader />
    </header>
    <main class="grow">
      <slot />
    </main>
    <footer class="flex justify-between pb-10">
      <div>{{ new Date().getFullYear() }} © ApartiFind</div>
    </footer>
  </div>
</template>
