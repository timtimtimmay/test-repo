import Link from 'next/link';

export const metadata = {
  title: 'About | Workforce Task Intelligence',
  description: 'Learn about Tim Dickinson and the strategy behind Workforce Task Intelligence.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Analyzer
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          About This Project
        </h1>
        <p className="text-lg text-gray-600">
          A portfolio demonstration of strategic workforce analytics.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* The Project */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">The Project</h2>
            <p className="text-gray-700 mb-4">
              Workforce Task Intelligence is a demonstration of how structured analysis can help
              organizations understand the potential impact of AI on their workforce. Rather than
              making sweeping predictions about job displacement, this tool focuses on task-level
              decomposition to provide actionable insights.
            </p>
            <p className="text-gray-700 mb-4">
              The methodology combines established occupational data (O*NET), AI capability
              assessment frameworks, and strategic analysis to help leaders make informed decisions
              about workforce development and technology adoption.
            </p>
            <p className="text-gray-700">
              This project showcases the intersection of strategy consulting and technical
              implementation &mdash; demonstrating that effective workforce analytics requires both
              rigorous methodology and practical tooling.
            </p>
          </section>

          {/* Key Capabilities */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Key Capabilities Demonstrated</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Strategic Analysis</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Rigorous methodology for assessing complex workforce transformation scenarios
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Full-Stack Development</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Modern web application using Next.js 14, TypeScript, and Tailwind CSS
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Data Visualization</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Interactive charts and responsive UI for complex analytical outputs
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">AI/ML Understanding</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Deep knowledge of AI capabilities and limitations for practical application
                </p>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Next.js 14',
                'React 18',
                'TypeScript',
                'Tailwind CSS',
                'Recharts',
                'Vercel',
                'App Router',
                'Server Components',
              ].map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 text-white text-2xl font-bold mb-3">
                TD
              </div>
              <h3 className="text-lg font-bold text-gray-900">Tim Dickinson</h3>
              <p className="text-sm text-gray-600">Strategy Practitioner</p>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <a
                href="https://aistrategypractitioner.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">Portfolio</span>
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-4">
              Explore
            </h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-slate-400 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">Try the Analyzer</span>
                <p className="text-xs text-gray-500 mt-1">Search and analyze job roles</p>
              </Link>
              <Link
                href="/methodology"
                className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-slate-400 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">Methodology Deep-Dive</span>
                <p className="text-xs text-gray-500 mt-1">Understand the analysis framework</p>
              </Link>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-slate-800 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-2">Interested in working together?</h3>
            <p className="text-sm text-slate-300 mb-4">
              I help organizations navigate workforce transformation and build practical AI solutions.
            </p>
            <a
              href="https://aistrategypractitioner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Get in Touch
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
