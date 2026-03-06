export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      <p className="text-gray-600 mb-8">
        Questions, feedback, or partnership inquiries?
        We'd love to hear from you.
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-lg px-4 py-3"
        />

        <textarea
          placeholder="Message"
          rows={5}
          className="w-full border rounded-lg px-4 py-3"
        />

        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Send Message
        </button>
      </form>
    </div>
  );
}