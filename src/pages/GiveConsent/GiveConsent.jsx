import { useConsent } from "../../hooks/useConsent"

export const GiveConsent = () => {
  const testData = {
    name: "Anakin",
    email: "aniskywalker@jedi.holo.net",
    consentIds: ["targetedAds", "anomStatistic"],
  }
  const { isLoading, sendConsent } = useConsent();

  const handleSendConsent = () => {
    if (!isLoading) {
      sendConsent(testData);
    }
  }
  return (
    <>
      <h4>Give Consent</h4>
      <button disabled={isLoading} onClick={handleSendConsent}>
        Send
      </button>
    </>
  )
}