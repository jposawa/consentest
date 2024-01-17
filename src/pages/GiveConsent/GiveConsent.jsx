import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useConsent } from "../../hooks"

import styles from "./GiveConsent.module.css";
import { CONSENT_TYPES } from "../../constants";
import { useNavigate } from "react-router-dom";

export const GiveConsent = () => {
  const navigate = useNavigate();
  const [formValid, setFormValid] = React.useState({
    name: false,
    email: false,
    consents: false,
  })
  const [selectedConsentIds, setSelectedConsentIds] = React.useState([])

  // const testData = {
  //   name: "Anakin",
  //   email: "aniskywalker@jedi.holo.net",
  //   consentIds: ["targetedAds", "anomStatistic"],
  // }
  const {
    isLoading,
    sendConsent,
    consentsList,
    updateConsent,
  } = useConsent();

  const handleSendConsent = (data, isNew = true) => {
    const usedFunction = isNew ? sendConsent : updateConsent;

    if (!isLoading) {
      usedFunction(data).then(() => {
        console.log("Should redirect");
        navigate("/consents");
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  const handleConsentChange = ({ target: { checked, name } }) => {
    const newList = [...selectedConsentIds];
    if (checked) {
      if (!newList.includes(name)) {
        newList.push(name)
      }
    } else {
      const consentIndex = newList.indexOf(name);

      if (consentIndex >= 0) {
        newList.splice(consentIndex, 1);
      }
    }

    setFormValid((currentFormValid) => ({
      ...currentFormValid,
      consents: !!newList.length,
    }))
    setSelectedConsentIds(newList);
  }

  const handleSubmit = async (values) => {
    const [existingUser] = consentsList.filter((consentData) => consentData.email === values.email);

    const formData = existingUser ? {
      ...existingUser,
      name: values.name,
    } : { ...values }

    // Doing this separately because it's for both cases
    formData.consentIds = selectedConsentIds;

    handleSendConsent(formData, !existingUser);
  }

  const handleFormChange = ({ target: { id, value } }) => {
    if (id) {
      const validState = { ...formValid };

      validState[id] = !!value;

      setFormValid(validState);
    }
  }

  return (
    <>
      <h4>Give Consent</h4>

      <Form
        onFinish={handleSubmit}
        autoComplete="off"
        disabled={isLoading}
        className={styles.consentForm}
        onChange={handleFormChange}
        data-testid="newConsentForm"
      >
        <div className={styles.formItemsContainer}>
          <div className={styles.personalInfoContainer}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name"
                }
              ]}
            >
              <Input
                placeholder="Your name"
                data-testid="newConsentFormName"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email"
                }
              ]}
            >
              <Input
                type="email"
                placeholder="name@domain.com"
                data-testid="newConsentFormEmail"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="I agree to"
            className={styles.optionsContainer}
          >
            {Object.values(CONSENT_TYPES).map((consent) => (
              <Checkbox
                key={consent.key}
                onChange={handleConsentChange}
                name={consent.key}
                data-testid={`newConsentFormCheck-${consent.key}`}
              >
                {consent.text}
              </Checkbox>
            ))}
          </Form.Item>
        </div>

        <div className={styles.actionsContainer}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading || Object.values(formValid).some((isValid) => !isValid)}
            data-testid="newConsentSubmit"
          >
            Send
          </Button>
        </div>
      </Form>
    </>
  )
}