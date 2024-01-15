import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useConsent } from "../../hooks/useConsent"

import styles from "./GiveConsent.module.css";
import { CONSENT_TYPES } from "../../constants";
import { useNavigate } from "react-router-dom";

export const GiveConsent = () => {
  const navigate = useNavigate();
  const [selectedConsentIds, setSelectedConsentIds] = React.useState([])
  const [consentValidation, setConsentValidation] = React.useState({
    status: "success",
    errorMsg: null,
  })
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

  const checkConsentValidation = () => {
    if (!selectedConsentIds.length) {
      setConsentValidation({
        status: "error",
        errorMsg: "You need to select at least one option"
      });

      return false;
    }

    setConsentValidation({
      status: "success",
      errorMsg: null,
    })

    return true;
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

    setSelectedConsentIds(newList);
  }

  const handleSubmit = async (values) => {
    if (!checkConsentValidation()) {
      return;
    }

    const [existingUser] = consentsList.filter((consentData) => consentData.email === values.email);

    const formData = existingUser ? { ...existingUser } : { ...values }
    formData.consentIds = selectedConsentIds;

    handleSendConsent(formData, !existingUser);
  }


  return (
    <>
      <h4>Give Consent</h4>

      <Form
        onFinish={handleSubmit}
        autoComplete="off"
        disabled={isLoading}
        className={styles.consentForm}
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
              <Input placeholder="Your name" />
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
              <Input type="email" placeholder="name@domain.com" />
            </Form.Item>
          </div>

          <Form.Item
            label="I agree to"
            validateStatus={consentValidation.status}
            help={consentValidation.errorMsg}
            className={styles.optionsContainer}
          >
            {Object.values(CONSENT_TYPES).map((consent) => (
              <Checkbox
                key={consent.key}
                onChange={handleConsentChange}
                name={consent.key}
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
            disabled={isLoading}
          >
            Send
          </Button>
        </div>
      </Form>
    </>
  )
}