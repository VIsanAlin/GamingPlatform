export default function returnPolicy() {
  return (
    <div className="bg-[#10002B] pt-4 pb-8">
      <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-2xl shadow-[#5A189A] text-white">
        <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
        <hr className="border-[#5A189A] pb-4" />
        <ol className="list-decimal pl-6 mb-6">
          <li>
            <p className="font-semibold text-[#e6bbff]">
              Activation Code Eligibility:
            </p>
            <ul className="list-disc pl-8">
              <li>
                Only unactivated or unused activation codes are eligible for
                return.
              </li>
              <li>
                Once an activation code has been used or activated, it cannot be
                returned.
              </li>
            </ul>
          </li>
          <hr className="border-[#9d4edd] mt-4 pb-4" />
          <li>
            <p className="font-semibold text-[#e6bbff]">Refund Criteria:</p>
            <ul className="list-disc pl-8">
              <li>
                Duplicate Purchase: If you accidentally purchase the same
                activation code multiple times, we will refund the duplicate
                purchase(s).
              </li>
              <li>
                Invalid or Non-Working Code: If the activation code is invalid
                or does not work as intended, we will issue a refund.
              </li>
            </ul>
          </li>
          <hr className="border-[#9d4edd] mt-4 pb-4" />
          <li>
            <p className="font-semibold text-[#e6bbff]">Refund Process:</p>
            <ul className="list-disc pl-8">
              <li>
                To request a refund, please contact our customer support within
                5 business days of purchase.
              </li>
              <li>
                Provide the order details, including the activation code and a
                description of the issue.
              </li>
              <li>
                Our customer support team will investigate the issue and
                determine if a refund is applicable.
              </li>
              <li>
                If eligible, the refund will be processed to the original
                payment method within 5 business days.
              </li>
            </ul>
          </li>
          <hr className="border-[#9d4edd] mt-4 pb-4" />
          <li>
            <p className="font-semibold text-[#e6bbff]">
              Non-Refundable Cases:
            </p>
            <ul className="list-disc pl-8">
              <li>
                We do not offer refunds for activation codes due to a change of
                mind or if you no longer want the game.
              </li>
              <li>
                It is the customer's responsibility to ensure that the game is
                compatible with their platform or system specifications. We do
                not offer refunds for compatibility issues.
              </li>
            </ul>
          </li>
          <hr className="border-[#9d4edd] mt-4 pb-4" />
          <li>
            <p className="font-semibold text-[#e6bbff]">Fraudulent Activity:</p>
            <ul className="list-disc pl-8">
              <li>
                Any fraudulent activity or abuse of the return policy will
                result in the denial of a refund.
              </li>
              <li>
                We reserve the right to refuse a refund if we suspect fraudulent
                activity or misuse of our services.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}
