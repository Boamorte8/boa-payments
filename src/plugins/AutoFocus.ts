export const AutoFocus = {
  mounted: (el: HTMLElement) => {
    const input = el.querySelector('input');
    input?.focus();
  },
};
