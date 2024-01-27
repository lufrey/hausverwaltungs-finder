import type { WatchStopHandle } from "vue";

const isLoading = ref(true);
const watchers = new Map<
  Ref,
  {
    watcher: WatchStopHandle;
    func: (ref: Ref) => boolean;
  }
>();

export function useCustomLoadingIndicator() {
  const shouldShow = () => {
    // go through all watchers, run their functions and combine with OR
    return Array.from(watchers.entries()).some(([ref, { func }]) => func(ref));
  };

  const registerLoadingRef = <TRefType>(
    ref: Ref<TRefType>,
    func: (ref: Ref<TRefType>) => boolean,
  ) => {
    watchers.set(ref, {
      watcher: watch(
        ref,
        () => {
          isLoading.value = shouldShow();
        },
        { immediate: true },
      ),
      func,
    });
    return () => unregisterLoadingRef(ref);
  };

  const unregisterLoadingRef = (ref: Ref) => {
    watchers.get(ref)?.watcher();
    watchers.delete(ref);
  };

  return {
    isLoading,
    registerLoadingRef,
    unregisterLoadingRef,
  };
}
