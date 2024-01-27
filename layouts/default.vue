<template>
  <LoadingIndicator />
  <div
    class="mx-auto flex max-w-[1180px] flex-col gap-10 px-4 pt-4 font-poppins md:px-14 xl:pt-8"
  >
    <header>
      <PageHeader />
    </header>
    <main class="grow">
      <slot />
    </main>
  </div>
  <PageFooter />
</template>
