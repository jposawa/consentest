import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Consents } from "../Consents";
import { useConsent } from "../../../hooks/";
import { mockConsents } from "../../../mocks";
import { mockMatchMedia } from "../../../mocks/utils";

vi.mock("../../../hooks/useConsent.js");

describe("Consents page", () => {
  beforeAll(() => {
    mockMatchMedia();
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });

  it("Show loading element", () => {
    useConsent.mockReturnValue({
      isLoading: true,
      consentsList: [],
    })
    render(<Consents />);

    expect(screen.getByTestId("loadingContainer")).toBeDefined();
  });

  it("Show data table", () => {
    useConsent.mockReturnValue({
      isLoading: false,
      consentsList: mockConsents,
    });
    render(<Consents />);

    expect(screen.getByTestId("consentTable")).toBeDefined();
  })
})