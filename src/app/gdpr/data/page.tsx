import React from "react";

const DataSubjectRightsPage: React.FC = () => {
  return (
    <div className="bg-firstColor px-12 py-12 space-y-4">
      <h2 className="font-semibold text-2xl text-eightColor">
        Data Subject Rights
      </h2>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 space-y-4 text-justify">
        <div className="pt-4 space-y-2">
          <h2>Access to Your Personal Data</h2>
          <p>
            You have the right to access the personal data we hold about you. We
            provide you with the necessary means to request and obtain a copy of
            your data, ensuring transparency and control.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Rectification and Erasure</h2>
          <p>
            We respect your right to ensure the accuracy of your personal data.
            If you find any inaccuracies or believe that your data should be
            erased, we provide mechanisms for rectification and the "right to be
            forgotten" according to applicable regulations.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Restriction and Objection</h2>
          <p>
            You have the right to restrict or object to the processing of your
            personal data under certain circumstances. We acknowledge and
            respect your choices and provide the necessary channels to exercise
            these rights.
          </p>
        </div>
        <div className="space-y-2">
          <h2>Data Portability</h2>
          <p>
            We understand the importance of data portability. You have the right
            to receive your personal data in a structured, commonly used, and
            machine-readable format, allowing you to transfer it to another
            controller if desired.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataSubjectRightsPage;
