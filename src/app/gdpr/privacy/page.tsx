import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-firstColor px-12 py-12 space-y-4">
      <h2 className="font-semibold text-2xl text-eightColor">Privacy Policy</h2>
      <div className="grid lg:grid-cols-2 gap-4 space-y-4 text-justify">
        <div className="pt-4 space-y-2">
          <h2>Information We Collect</h2>
          <p>
            Our privacy policy outlines the types of information we collect from
            users, such as personal data, usage data, and cookies. We provide
            clear details about the purpose and legal basis for collecting and
            processing this information.
          </p>
        </div>
        <div className="space-y-2">
          <h2>How We Use Your Information</h2>
          <p>
            We explain how we use the collected information and the lawful
            grounds for processing it. We outline the specific purposes, such as
            providing our services, personalizing user experiences, and
            improving our website's functionality.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Information Sharing and Disclosure</h2>
          <p>
            We clarify the circumstances in which we may share or disclose user
            information to third parties, such as service providers or legal
            authorities. We ensure that any sharing or disclosure complies with
            applicable data protection laws and safeguards user privacy.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Data Retention</h2>
          <p>
            We specify the duration for which we retain user information and the
            criteria used to determine the retention period. We adhere to data
            minimization principles and only retain data for as long as
            necessary to fulfill the purposes outlined in our privacy policy.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Security Measures</h2>
          <p>
            We describe the security measures we have implemented to protect
            user information from unauthorized access, disclosure, alteration,
            or destruction. We prioritize data security and follow industry best
            practices to safeguard user privacy.
          </p>
        </div>
        <div className="space-y-2">
          <h2>User Rights</h2>
          <p>
            We inform users about their rights regarding their personal data,
            including the right to access, rectify, erase, restrict processing,
            object to processing, and data portability. We provide instructions
            on how users can exercise these rights.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Third-Party Links and Services</h2>
          <p>
            We disclose if our website contains links to third-party websites or
            if we use third-party services that may have their own privacy
            policies. We encourage users to review the privacy practices of such
            third parties before interacting with them.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Updates to Our Privacy Policy</h2>
          <p>
            We explain how we may update or modify our privacy policy and notify
            users of any material changes. We encourage users to periodically
            review our privacy policy to stay informed about how we handle their
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
