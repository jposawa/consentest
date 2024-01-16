import { vi } from "vitest";
import { mockConsents } from "../consents";

const mockHookResponse = {
  consentsList: mockConsents,
  isLoading: false,
};

export const useConsentMockImplementation = () => mockHookResponse;

export const useConsent = vi
  .fn()
  .mockImplementation(useConsentMockImplementation);

vi.doMock("../../hooks/useConsent", () => ({
  useConsent
}))