const API_URL = "/api/consents";

export const getConsents = () => (
  fetch(API_URL).then(async (response) => {
    const json = await response.json();

    return json.consents;
  }).catch((error) => {
    throw error
  })
)

export const postConsent = (body) => (
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (response) => {
    if (response.status !== 201) {
      throw Error(response.text());
    }

    const json = await response.json();

    return json.consent;
  }).catch((error) => {
    console.error("Post error", error);
  })
)