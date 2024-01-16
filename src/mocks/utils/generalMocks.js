import { vi } from "vitest";

export const mockMatchMedia = () => {
  Object.defineProperty(window, "matchMedia", {
    value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() }))
  });
}