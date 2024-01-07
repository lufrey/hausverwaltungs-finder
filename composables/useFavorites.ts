import { z } from "zod";

const { get, set } = useLocalStorage("favorites", z.array(z.string()));
const favorites = ref<string[]>(get() ?? []);

export const useFavorite = (id: string) => {
  const add = () => {
    const newFavorites = Array.from(new Set([...favorites.value, id]));
    set(newFavorites);
    favorites.value = newFavorites;
  };

  const remove = () => {
    const newFavorites = favorites.value.filter(
      (favoriteId: string) => favoriteId !== id,
    );
    set(newFavorites);
    favorites.value = newFavorites;
  };

  const toggle = () => {
    if (favorites.value.includes(id)) {
      remove();
    } else {
      add();
    }
  };

  const isFavorite = computed(() => {
    return favorites.value.includes(id);
  });

  return {
    add,
    toggle,
    remove,
    isFavorite,
    favorites,
  };
};
