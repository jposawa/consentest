import { Routes as Switch, Route } from "react-router-dom";
import { Consents, GiveConsent } from ".";

export const Router = () => {
  return (
    <Switch>
      <Route index path="/" element={<Consents />} />

      <Route path="/consents" element={<Consents />} />

      <Route path="/give-consent" element={<GiveConsent />} />
    </Switch>
  )
}