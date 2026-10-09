export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-white dark:text-white space-y-6">
      <h1 className="text-3xl font-bold border-b border-green-500/30 pb-3 text-green-400">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-400">
        <strong>Effective Date:</strong> October 10, 2026
      </p>

      <p className="text-gray-300 leading-relaxed">
        Welcome to <strong>Ben10 Alien Explorer</strong>! This is a non-commercial, personal portfolio and educational project built to showcase full-stack web development. I value your privacy and want to be completely transparent about how data is handled.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-green-400">
          1. Data Collected
        </h2>
        <p className="text-gray-300">
          Because this app offers authenticated features, I collect and handle a minimal amount of data:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">Account Information:</strong> If you log in via OAuth (Google or GitHub) or email/password, basic profile information (such as your email and name/avatar provided by your OAuth provider) is stored to manage your account session via Better Auth.
          </li>
          <li>
            <strong className="text-white">Favorites:</strong> When you save aliens to your personal collection, your user ID and the corresponding alien IDs are saved in a PostgreSQL database.
          </li>
          <li>
            <strong className="text-white">Chat History & Prompts:</strong> When you talk to <strong>Assist10</strong> (the AI chat assistant), your messages and the generated responses are temporarily saved to PostgreSQL so you can view your conversation history across sessions.
          </li>
          <li>
            <strong className="text-white">Feedback:</strong> Any messages or suggestions submitted through the feedback form are stored in PostgreSQL for review.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-green-400">
          2. Third-Party Services
        </h2>
        <p className="text-gray-300">
          To keep the Omnitrix running smoothly, this project connects to a few external services:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">Authentication:</strong> Better Auth (with Google & GitHub OAuth) for secure sign-in handling.
          </li>
          <li>
            <strong className="text-white">AI & Vector Search:</strong> Google Gemini API (for embeddings and chat generation) and DataStax Astra DB (for storing domain-specific vector knowledge). Your queries are sent securely to these services to fetch accurate Ben 10 answers.
          </li>
          <li>
            <strong className="text-white">Database & Media:</strong> PostgreSQL (hosted database for application data) and Cloudinary (hosting external alien imagery).
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-green-400">
          3. Data Ownership & Control
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">You Own Your Data:</strong> Your account details, saved favorites, and chat history belong to you.
          </li>
          <li>
            <strong className="text-white">Clearing Your Data:</strong> You can delete your chat history at any time directly within the Assist10 chat interface.
          </li>
          <li>
            <strong className="text-white">Session Data:</strong> You can clear local session data or cached preferences anytime by clearing your browser cache/cookies or signing out.
          </li>
          <li>
            <strong className="text-white">Account Removal:</strong> If you’d like your account, feedback, or saved data completely removed from the database, feel free to reach out via your GitHub profile or email.
          </li>
        </ul>
      </section>
    </main>
  );
}