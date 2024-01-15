import { useConsent } from "../../hooks/useConsent"
import { Table } from "antd";
import { CONSENT_TYPES } from "../../constants";

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
        <span key={`${userConsents[0]}-${index}`}>
          {userConsents.map((consentKey, index) => {
            const consentName = CONSENT_TYPES[consentKey].text;

            return (
              <p key={`${consentKey}-${index}`}>
                {consentName}
              </p>
            )
          })}
        </span>
      )
    },
  ];

  return (
    <>
      <h4>Consents information</h4>
      {!isLoading && (
        <Table
          columns={columns}
          dataSource={consentsList}
          rowKey="id"
          pagination={{
            pageSize: 2
          }}
        />
      )}
    </>
  )
}