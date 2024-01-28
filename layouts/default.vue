<template>
  <LoadingIndicator />
  <div
    class="mx-auto flex w-full max-w-[1180px] grow flex-col gap-10 px-4 pt-4 font-poppins md:px-14 xl:pt-8"
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
<style inline>
#__nuxt {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
