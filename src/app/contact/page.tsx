export default function Contact() {
  return (
    <div className="bg-[#10002B] pt-4 pb-8">
      <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-2xl shadow-[#5A189A] text-white">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <hr className="border-[#5A189A] pb-4" />

        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-semibold text-white mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg bg-white text-[#5A189A] focus:outline-none focus:ring focus:border-[#e6bbff]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold text-white mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-white text-[#5A189A] focus:outline-none focus:ring focus:border-[#e6bbff]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block font-semibold text-white mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full px-4 py-2 rounded-lg bg-white text-[#5A189A] focus:outline-none focus:ring focus:border-[#e6bbff]"
              rows={6}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#9d4edd] py-2 px-4 rounded-lg text-white font-semibold hover:bg-[#5A189A] transition-colors duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
