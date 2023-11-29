<script setup lang="ts">
useHead({
  title: "Admin Dashboard",
});
const { $client } = useNuxtApp();

const propertyManagements = await $client.propertyManagement.getAll.useQuery();
const isScrapingNewData = ref(false);
</script>
<template>
  <main>
    <h2 class="pb-4 text-xl">Hausverwaltungen</h2>
    <div class="flex flex-col gap-4">
      <FatButton
        :action="
          async () => {
            isScrapingNewData = true;
            await $client.propertyManagement.update.mutate();
            propertyManagements.refresh();
            isScrapingNewData = false;
          }
        "
        class="-right-4 ml-auto flex items-center gap-4 md:-right-10"
      >
        Alles neu laden
        <LoadingSpinner v-if="isScrapingNewData" />
      </FatButton>

      <div
        v-for="propertyManagement in propertyManagements.data.value"
        :key="propertyManagement.slug"
        class="mb-6 flex flex-col gap-4 rounded-3xl bg-background p-5"
      >
        <h3 class="text-l">
          {{ propertyManagement.name }}
        </h3>
        <div class="flex gap-4">
          <p>
            aktive Wohnungen:
            {{
              propertyManagement.flats.filter((flat) => flat.isActive).length
            }}
          </p>
          <p>Insgesamt: {{ propertyManagement.flats.length }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
