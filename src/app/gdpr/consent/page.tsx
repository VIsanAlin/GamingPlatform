import React from "react";

const ConsentManagementPage: React.FC = () => {
  return (
    <div className="bg-firstColor px-12 py-12 space-y-4 ">
      <h2 className="font-semibold text-2xl text-eightColor">
        Consent Management
      </h2>

      <div className="grid lg:grid-cols-2  gap-4 space-y-4 text-justify">
        <div className="pt-4 space-y-2">
          <h2>Transparent Consent Collection</h2>
          <p>
            We value your privacy and seek your explicit consent before
            processing your data. We ask for your approval to ensure
            transparency and build trust.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Withdrawal of Consent</h2>
          <p>
            We respect your choices and provide you the option to change or
            withdraw your consent at any time. However, please note that
            withdrawing consent may limit or affect certain functionalities or
            services we offer.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Customized Consent Forms</h2>
          <p>
            We believe in personalization and allow you to design every detail
            of the consent pop-ups and bars. This ensures that you have control
            over your data and can make informed decisions.
          </p>
        </div>
        <div className="space-y-2">
          <h2>User Privacy Settings</h2>
          <p>
            We empower you to review and modify your privacy settings easily.
            You can change your decisions regarding consent and also submit data
            requests whenever necessary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsentManagementPage;
