import React from "react";

const StoragePolicyPage: React.FC = () => {
  return (
    <div className="bg-firstColor px-12 py-12 space-y-4">
      <h2 className="font-semibold text-2xl text-eightColor">
        {" "}
        Storage Policy{" "}
      </h2>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 space-y-4 text-justify">
        <div className="pt-4 space-y-2">
          <h2>Storage of Personal Data</h2>
          <p>
            We outline how we store and protect personal data collected from
            users. We describe the measures we have in place to ensure the
            security and integrity of the stored data, such as encryption,
            access controls, and regular backups.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Data Retention Period</h2>
          <p>
            We specify the duration for which we retain user data and the
            criteria used to determine the retention period. We adhere to data
            minimization principles and only retain data for as long as
            necessary to fulfill the purposes outlined in our storage policy.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Data Deletion and Disposal</h2>
          <p>
            We explain the procedures and timelines for deleting or disposing of
            user data once it is no longer needed. We ensure that data is
            securely deleted/disposed of in compliance with applicable data
            protection laws and regulations.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Data Backup and Recovery</h2>
          <p>
            We describe the backup procedures and mechanisms we have in place to
            prevent data loss. We explain how we regularly back up user data and
            perform recovery processes in the event of a data loss incident to
            minimize disruption and protect user information.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Data Transfer and Storage Locations</h2>
          <p>
            We disclose if user data may be transferred or stored in locations
            outside of the user's country or region. We explain the safeguards
            we have in place, such as standard contractual clauses or other
            approved mechanisms, to ensure an adequate level of protection for
            transferred data.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Third-Party Service Providers</h2>
          <p>
            We inform users if we engage third-party service providers for data
            storage purposes and explain how we ensure their compliance with
            applicable data protection laws and regulations. We may mention
            specific security measures or certifications that the service
            providers adhere to.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Data Breach Notification</h2>
          <p>
            We outline our procedures for detecting, assessing, and responding
            to data breaches. We explain how we notify affected users and
            regulatory authorities in compliance with relevant laws and
            regulations, and how we take necessary steps to mitigate the impact
            of the breach.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Updates to Our Storage Policy</h2>
          <p>
            We explain how we may update or modify our storage policy and notify
            users of any material changes. We encourage users to periodically
            review our storage policy to stay informed about how we handle and
            store their data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoragePolicyPage;
