import { useConsent } from "../../hooks"
import { Table } from "antd";
import { CONSENT_TYPES } from "../../constants";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./Consents.module.css";

export const Consents = () => {
  const { isLoading, consentsList } = useConsent();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Consents',
      dataIndex: 'consentIds',
      key: 'consentIds',
      render: (userConsents, index) => (
        <ul className={styles.consentsList} key={`${userConsents[0]}-${index}`}>
          {userConsents.map((consentKey, index) => {
            const consentName = CONSENT_TYPES[consentKey].text;

            return (
              <li key={`${consentKey}-${index}`}>
                {consentName}
              </li>
            )
          })}
        </ul>
      )
    },
  ];

  return (
    <>
      <h4>Consents information</h4>
      {isLoading ? (
        <span className={styles.loadingContainer} data-testid="loadingContainer">
          <LoadingOutlined />
        </span>
      ) : (
        <Table
          columns={columns}
          dataSource={consentsList}
          rowKey="id"
          pagination={{
            pageSize: 2
          }}
          data-testid="consentTable"
        />
      )}
    </>
  )
}