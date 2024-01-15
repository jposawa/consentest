import React from "react"
import { getConsents, postConsent } from "../services";

export const useConsent = () => {
  const [isLoading, setIsLoading] = React.useState(false);

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

      return response;
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

  return React.useMemo(() => ({
    isLoading,
    fetchConsents,
    sendConsent,
  }), [isLoading, fetchConsents, sendConsent]);
}