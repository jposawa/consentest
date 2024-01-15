import React from "react"
import { useConsent } from "../../hooks/useConsent"

export const Consents = () => {
  const { isLoading, fetchConsents } = useConsent();
  React.useEffect(() => {
    if (!isLoading) {
      fetchConsents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <h4>Consents</h4>
  )
}