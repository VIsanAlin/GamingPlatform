import Link from "next/link";

export default function GDPR() {
  return (
    <div className="bg-firstColor px-12 py-12 ">
      <h1 className="py-4">All the information about GDPR</h1>
      <hr className="bg-forthColor" />

      <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:justify-between py-4">
        <div>
          <Link
            href="/gdpr/consent"
            as={`/gdpr/consent`}
            key={"consent"}
            className="bg-eightColor text-secondColor text-2xl rounded-xl px-2 py-2"
          >
            Consent{" "}
          </Link>
        </div>
        <div>
          <Link
            href="/gdpr/data"
            as={`/gdpr/data`}
            key={"data"}
            className="bg-eightColor text-secondColor text-2xl rounded-xl px-2 py-2"
          >
            Data
          </Link>
        </div>
        <div>
          <Link
            href="/gdpr/privacy"
            as={`/gdpr/privacy`}
            key={"privacy"}
            className="bg-eightColor text-secondColor text-2xl rounded-xl px-2 py-2"
          >
            Privacy
          </Link>
        </div>
        <div>
          <Link
            href="/gdpr/storage"
            as={`/gdpr/storage`}
            key={"storage"}
            className="bg-eightColor text-secondColor text-2xl rounded-xl px-2 py-2"
          >
            Storage
          </Link>
        </div>
      </div>
      <hr className="bg-forthColor" />
      <div className="space-y-4 pt-4">
        <div>
          <h2>Consent and Transparency</h2>
          <p>
            Obtain explicit consent from users before processing their personal
            data. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p>
            Clearly inform users about the purpose, scope, and duration of data
            processing activities. Sed cursus ante dapibus diam. Sed nisi.
          </p>
          <p>
            Provide easily accessible information regarding data processing
            practices, including the identity of the data controller. Nulla quis
            sem at nibh elementum imperdiet.
          </p>
        </div>

        <div>
          <h2>Data Collection and Processing</h2>
          <p>
            Collect and process only the minimum necessary personal data for the
            intended purpose. Duis sagittis ipsum. Praesent mauris.
          </p>
          <p>
            Implement mechanisms to ensure data accuracy and enable data
            subjects to update their information. Fusce nec tellus sed augue
            semper porta.
          </p>
          <p>
            Clearly state the lawful basis for processing personal data (e.g.,
            consent, legitimate interest, contractual necessity). Praesent
            libero.
          </p>
        </div>

        <div>
          <h2>User Rights</h2>
          <p>
            Provide individuals with the right to access their personal data and
            obtain a copy of it. Vestibulum lacinia arcu eget nulla.
          </p>
          <p>
            Offer the right to rectify or erase personal data (right to be
            forgotten). Class aptent taciti sociosqu ad litora torquent.
          </p>
          <p>
            Enable data subjects to restrict or object to the processing of
            their data. Mauris massa.
          </p>
          <p>
            Facilitate data portability, allowing individuals to receive their
            data in a structured, commonly used, and machine-readable format.
            Curabitur sodales ligula in libero.
          </p>
        </div>

        <div>
          <h2>Data Security</h2>
          <p>
            Implement appropriate technical and organizational measures to
            ensure the security of personal data. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p>
            Regularly assess and review the effectiveness of security measures.
            Sed cursus ante dapibus diam. Sed nisi.
          </p>
          <p>
            Report any data breaches to the relevant supervisory authority and
            affected individuals within the specified timeframe. Nulla quis sem
            at nibh elementum imperdiet.
          </p>
        </div>

        <div>
          <h2>Data Processing Agreements</h2>
          <p>
            Establish data processing agreements with any third parties involved
            in the processing of personal data on your behalf. Duis sagittis
            ipsum. Praesent mauris.
          </p>
          <p>
            Ensure that these agreements comply with GDPR requirements and
            provide sufficient safeguards for data protection. Fusce nec tellus
            sed augue semper porta.
          </p>
        </div>

        <div>
          <h2>Cookies and Tracking</h2>
          <p>
            Obtain user consent before placing cookies or using any tracking
            technologies on your website. Vestibulum lacinia arcu eget nulla.
          </p>
          <p>
            Provide clear information about the types of cookies used and their
            purpose. Class aptent taciti sociosqu ad litora torquent.
          </p>
          <p>
            Allow users to manage their cookie preferences and provide an option
            to withdraw consent. Mauris massa.
          </p>
        </div>

        <div>
          <h2>Data Protection Officer (DPO)</h2>
          <p>
            Appoint a Data Protection Officer if your organizations core
            activities involve regular and systematic monitoring of individuals
            on a large scale, or if you process sensitive personal data on a
            large scale. Donec ac odio tempor orci dapibus ultrices in iaculis
            nunc. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Sed at neque arcu. Suspendisse
            potenti.
          </p>
        </div>
      </div>
    </div>
  );
}
