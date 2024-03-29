<script setup lang="ts">
useHead({
  title: "Admin Dashboard",
});
definePageMeta({
  middleware: ["auth"],
});
const { $client } = useNuxtApp();
const NuxtLink = resolveComponent("NuxtLink");

const propertyManagements = await $client.propertyManagement.getAll.useQuery();

const scrapingStatus = ref<{
  slugs?: string[];
  isActive: boolean;
}>({
  isActive: false,
});

const updatePropertyManagements = async (slugs?: string[]) => {
  if (scrapingStatus.value.isActive) {
    return;
  }

  scrapingStatus.value = {
    slugs,
    isActive: true,
  };

  await $client.propertyManagement.update.mutate({ slugs });
  propertyManagements.refresh();

  scrapingStatus.value = {
    isActive: false,
  };
};

const allFlats = computed(() =>
  propertyManagements.data.value?.map((p) => p.flats).flat(),
);
</script>
<template>
  <main>
    <h2 class="pb-4 text-xl">Übersicht</h2>
    <div class="flex flex-col gap-4">
      <div class="mb-4 flex flex-col gap-4 md:flex-row">
        <table class="-mx-2 mr-auto border-separate border-spacing-2">
          <tr>
            <td>Wohnungen (aktiv):</td>
            <td>
              {{ allFlats?.filter((flat) => flat.isActive).length ?? 0 }}
            </td>
          </tr>
          <tr>
            <td>Wohnungen (gesamt):</td>
            <td>
              {{ allFlats?.length ?? 0 }}
            </td>
          </tr>
        </table>
        <FatButton
          :action="() => void updatePropertyManagements()"
          class="-right-4 mb-4 ml-auto flex items-center gap-4 md:-right-10"
        >
          Alles neu laden
          <LoadingSpinner
            v-if="scrapingStatus.isActive && !scrapingStatus.slugs"
          />
        </FatButton>
      </div>
      <div class="grid gap-4 lg:grid-cols-2">
        <div
          v-for="propertyManagement in propertyManagements.data.value"
          :key="propertyManagement.slug"
          class="flex flex-col gap-4 rounded-3xl border border-black bg-background p-5"
        >
          <component
            :is="propertyManagement.website ? NuxtLink : 'span'"
            :to="propertyManagement.website"
          >
            <h3 class="text-l">
              {{ propertyManagement.name }}
            </h3>
          </component>

          <table class="-mx-2 mr-auto border-separate border-spacing-2">
            <tr>
              <td>Wohnungen (aktiv):</td>
              <td>
                {{
                  propertyManagement.flats.filter((flat) => flat.isActive)
                    .length
                }}
              </td>
            </tr>
            <tr>
              <td>Wohnungen (gesamt):</td>
              <td>{{ propertyManagement.flats.length }}</td>
            </tr>
          </table>
          <FatButton
            :action="
              () => void updatePropertyManagements([propertyManagement.slug])
            "
            class="-right-4 mb-4 ml-auto flex items-center gap-4 md:-right-10"
          >
            neu laden
            <LoadingSpinner
              v-if="
                scrapingStatus.isActive &&
                scrapingStatus.slugs?.includes(propertyManagement.slug)
              "
            />
          </FatButton>
        </div>
      </div>
    </div>
  </main>
</template>
