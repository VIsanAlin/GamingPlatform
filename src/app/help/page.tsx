import Link from "next/link";

export default function Help() {
  return (
    <div className="bg-firstColor">
      <div className="text-center text-4xl pt-12 pb-6">Help Section </div>
      <div className="text-center text-xl py-4 px-4">
        What type of help you need us to provide for you?
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:px-8 md:space-x-8 py-8">
        <Link
          href="help/faq"
          className="px-4 text-center bg-thirdColor text-white rounded-lg py-2 hover:bg-forthColor transition-colors duration-300 ease-in-out mx-auto space-y-2 max-w-sm md:max-w-md"
        >
          <p className="font-medium text-3xl">FAQ</p>
          <p className="text-sm leading-snug py-4">
            Frequently asked questions might help you get the answer you need
          </p>
        </Link>
        <Link
          href="help/return"
          className="px-4 text-center bg-thirdColor text-white rounded-lg py-2 hover:bg-forthColor transition-colors duration-300 ease-in-out mx-auto space-y-2 max-w-sm md:max-w-md"
        >
          <p className="font-medium text-3xl">Return Policy</p>
          <p className="text-sm leading-snug py-4">
            All the information you might need about our return policy
          </p>
        </Link>
        <Link
          href="help/ticket"
          className="px-4 text-center bg-thirdColor text-white rounded-lg py-2 hover:bg-forthColor transition-colors duration-300 ease-in-out mx-auto space-y-2 max-w-sm md:max-w-md"
        >
          <p className="font-medium text-3xl">Ticket</p>
          <p className="text-sm leading-snug py-4">
            You need our personal help, submit a ticket and we will answer as
            soon as possible
          </p>
        </Link>
      </div>
    </div>
  );
}
