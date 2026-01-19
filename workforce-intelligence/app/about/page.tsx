import Link from 'next/link';
import Image from 'next/image';

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
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-amber-600 mb-4 transition-colors"
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
          A portfolio demonstration of AI transformation insights.
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
              Building this tool requires both strategic AI insight and deep technical
              experimentation. Understanding what AI can and cannot do today &mdash; and where it&apos;s
              heading &mdash; only comes from hands-on building, not just reading about it.
            </p>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-center">
              <Image
                src="/tim-dickinson.jpg"
                alt="Tim Dickinson"
                width={80}
                height={80}
                className="rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-bold text-gray-900">Tim Dickinson</h3>
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
                className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-400 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">Try the Analyzer</span>
                <p className="text-xs text-gray-500 mt-1">Search and analyze job roles</p>
              </Link>
              <Link
                href="/methodology"
                className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-400 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">Methodology Deep-Dive</span>
                <p className="text-xs text-gray-500 mt-1">Understand the analysis framework</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
