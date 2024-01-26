<template>
  <LoadingIndicator />
  <div
    class="mx-auto flex h-full max-w-[1180px] flex-col gap-10 px-4 pt-4 font-poppins md:px-14 xl:pt-8"
  >
    <header>
      <PageHeader />
    </header>
    <main class="grow">
      <slot />
    </main>
    <footer class="justify-between pb-10 lg:flex">
      <div>{{ new Date().getFullYear() }} © ApartiFind</div>
      <br />
      <aside class="block opacity-60">
        <h6>Credits</h6>
        <ul class="ml-4 list-disc">
          <li>
            <a
              href="https://www.flaticon.com/free-icons/temperature"
              target="_blank"
              title="temperature icons"
              >Temperature icons created by Freepik - Flaticon</a
            >
          </li>
        </ul>
      </aside>
    </footer>
  </div>
</template>
