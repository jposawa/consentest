import { PropTypes } from "prop-types";
import { Routes as Switch, Route } from "react-router-dom";
import { Consents, GiveConsent } from ".";

export const Router = ({
  className
}) => {
  return (
    <section className={className}>
      <Switch>
        <Route index path="/" element={<Consents />} />

        <Route path="/consents" element={<Consents />} />

        <Route path="/give-consent" element={<GiveConsent />} />
      </Switch>
    </section>
  )
}

Router.defaultProps = {
  className: "",
}

Router.propTypes = {
  className: PropTypes.string,
}