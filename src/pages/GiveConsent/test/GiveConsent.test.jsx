import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "../../../mocks/utils";
import { GiveConsent } from "../GiveConsent";
import { BrowserRouter } from "react-router-dom";
import { useConsent } from "../../../hooks";

vi.mock("../../../hooks/useConsent.js");
let component;

describe("Give Consents page", () => {
  // const setState = vi.fn();
  beforeEach(() => {
    mockMatchMedia()
    useConsent.mockReturnValue({
      isLoading: false,
    })
    component = render(
      <BrowserRouter>
        <GiveConsent />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    component.unmount();
  })

  it("Render form", () => {
    const formElement = screen.getByTestId("newConsentForm");
    expect(formElement).toBeDefined();
  })

  it("Button disabled at first render", () => {
    const submitElement = screen.getByTestId("newConsentSubmit");
    expect(submitElement).toHaveProperty("disabled", true);
  })

  it("Button enabled after form filled", () => {
    const nameElement = screen.getByTestId("newConsentFormName");
    const emailElement = screen.getByTestId("newConsentFormEmail");
    const newsletterCheckElement = screen.getByTestId("newConsentFormCheck-newsletter")
    const submitElement = screen.getByTestId("newConsentSubmit");

    fireEvent.change(nameElement, {
      target: {
        value: "Anakin"
      }
    });
    fireEvent.change(emailElement, {
      target: {
        value: "aniskywalker@jedi.holo.net"
      }
    });
    fireEvent.click(newsletterCheckElement);

    expect(submitElement).toHaveProperty("disabled", false);
  })
})