export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-white dark:text-white space-y-6">
      <h1 className="text-3xl font-bold border-b border-green-500/30 pb-3 text-green-400">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-400">
        <strong>Effective Date:</strong> October 10, 2026
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-green-400">
          1. Open-Source & "As-Is" Disclaimer
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">Portfolio Showcase:</strong> This app is a fan-made, non-commercial educational project created to demonstrate full-stack software development skills.
          </li>
          <li>
            <strong className="text-white">Provided "As-Is":</strong> The service is provided on an "as is" and "as available" basis, without warranties of any kind. Features, API connections, or uptime may change or be temporarily unavailable without prior notice.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-green-400">
          2. Acceptance & Fair Usage
        </h2>
        <p className="text-gray-300">
          By accessing or using <strong>Ben10 Alien Explorer</strong>, you agree to use the project responsibly:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">No Abusive Behavior:</strong> Please do not attempt to bypass rate limits (Assist10 has a 20-request-per-minute rate limit), spam the feedback system, perform DDoS attacks, or exploit API endpoints.
          </li>
          <li>
            <strong className="text-white">Appropriate AI Chat:</strong> Assist10 is designed specifically for Ben 10 queries—please keep chat prompts reasonable and respectful.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-green-400">
          3. Intellectual Property & Rights
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">Ben 10 Franchise:</strong> Ben 10 characters, names, imagery, planets, and related lore belong entirely to their respective rights holders (Cartoon Network / Warner Bros. Discovery). This fan project is strictly educational and non-commercial.
          </li>
          <li>
            <strong className="text-white">Source Code Ownership:</strong> The original codebase and architecture for this application were developed as a portfolio project. Feel free to explore the repository on GitHub.
          </li>
        </ul>
      </section>
    </main>
  );
}