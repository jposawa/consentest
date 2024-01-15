import React from "react"
import { getConsents, postConsent, putConsent } from "../services";

export const useConsent = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [consentsList, setConsentsList] = React.useState([]);

  /**
   * Fetch list of consents
   * 
   * @returns {Array<object>}
   */
  const fetchConsents = React.useCallback(async () => {
    if (!isLoading) {
      setIsLoading(true);
      const response = await getConsents();

      setIsLoading(false);

      setConsentsList(response || []);
    }
  }, [isLoading]);

  /**
   * Send consent
   * 
   * @param {object} body
   * @param {string} body.name
   * @param {string} body.email
   * @param {string[]} body.consentIds
   * 
   * @returns {object} Latest consent sent
   */
  const sendConsent = React.useCallback(async (body) => {
    if (!isLoading) {
      setIsLoading(true);
      const response = await postConsent(body);

      setIsLoading(false);

      return response;
    }
  }, [isLoading]);

  /**
   * Update consent
   * 
   * @param {object} body
   * @param {string} body.id
   * @param {string} body.name
   * @param {string} body.email
   * @param {string[]} body.consentIds
   * 
   * @returns {object} Latest consent sent
   */
  const updateConsent = React.useCallback(async (body) => {
    if (!isLoading) {
      setIsLoading(true);
      const response = await putConsent(body);

      setIsLoading(false);

      return response;
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (!consentsList.length && !isLoading) {
      fetchConsents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.useMemo(() => ({
    consentsList,
    isLoading,
    fetchConsents,
    sendConsent,
    updateConsent,
  }), [consentsList, isLoading, fetchConsents, sendConsent, updateConsent]);
}