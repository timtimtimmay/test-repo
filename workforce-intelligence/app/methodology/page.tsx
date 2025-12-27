import Link from 'next/link';

export const metadata = {
  title: 'Methodology | Workforce Task Intelligence',
  description: 'Deep dive into the methodology behind workforce task analysis and automation exposure assessment.',
};

export default function MethodologyPage() {
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
          Methodology
        </h1>
        <p className="text-lg text-gray-600">
          A detailed look at how we assess workforce automation exposure and skill implications.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-4">
              The Workforce Task Intelligence methodology provides a structured approach to understanding
              how AI capabilities may impact specific job roles. Rather than making broad predictions about
              job displacement, we focus on <strong>task-level analysis</strong> to provide actionable insights.
            </p>
            <p className="text-gray-700">
              This approach recognizes that most jobs consist of a portfolio of tasks with varying degrees
              of automation potential. The same role may have some tasks that are highly automatable while
              others remain firmly in the human domain.
            </p>
          </div>
        </section>

        {/* Step 1 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-white font-bold">
              1
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Taxonomy Resolution</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Do</h3>
            <p className="text-gray-700 mb-4">
              We map input job titles to standardized occupational classifications using the O*NET
              (Occupational Information Network) database. This ensures consistent task decomposition
              across similar roles and enables comparison with established workforce data.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Sources</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>O*NET Database (version 28.0)</li>
              <li>Bureau of Labor Statistics Standard Occupational Classification (SOC)</li>
              <li>Industry-specific job title mappings</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Limitations</h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2">
              <li>O*NET task lists may lag behind rapidly evolving job requirements</li>
              <li>Emerging roles may not have established classifications</li>
              <li>Organizational variations in job definitions not captured</li>
            </ul>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-white font-bold">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Task Decomposition</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Do</h3>
            <p className="text-gray-700 mb-4">
              Each role is broken into its constituent tasks using O*NET task statements supplemented
              by industry research. We identify the core activities that make up the role and estimate
              time allocation across tasks.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Task Classification Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-2">
                  Automate
                </div>
                <p className="text-sm text-blue-900">
                  Tasks where AI can perform the core function with minimal human oversight
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 mb-2">
                  Augment
                </div>
                <p className="text-sm text-purple-900">
                  Tasks where AI enhances human capability but human judgment remains essential
                </p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-2">
                  Retain
                </div>
                <p className="text-sm text-emerald-900">
                  Tasks that remain primarily human due to interpersonal, creative, or judgment requirements
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Limitations</h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2">
              <li>Task weighting based on typical role distribution, may vary by organization</li>
              <li>Informal tasks and organizational context not fully captured</li>
              <li>Task interdependencies may affect automation feasibility</li>
            </ul>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-white font-bold">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-900">AI Capability Matching</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Do</h3>
            <p className="text-gray-700 mb-4">
              Each task is evaluated against current AI capabilities using a standardized rubric.
              We assess specific AI competencies required for each task and match them against
              demonstrated capabilities in deployed systems.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Capability Assessment Factors</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Technical Feasibility:</strong> Can current AI systems perform this task?</li>
              <li><strong>Reliability:</strong> Can AI perform consistently at acceptable quality levels?</li>
              <li><strong>Economic Viability:</strong> Is automation cost-effective relative to human labor?</li>
              <li><strong>Adoption Barriers:</strong> What organizational or regulatory factors affect deployment?</li>
            </ul>
          </div>

          <div className="bg-slate-100 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Capability Level Scenarios</h3>
            <p className="text-gray-700 mb-4">
              The tool allows users to adjust AI capability assumptions to see how different
              scenarios affect exposure assessments:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  Conservative
                </span>
                <p className="text-sm text-gray-700">
                  Assumes slower AI advancement, higher reliability thresholds, and more adoption barriers
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  Moderate
                </span>
                <p className="text-sm text-gray-700">
                  Assumes current AI trajectory continues with incremental improvements
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  Bold
                </span>
                <p className="text-sm text-gray-700">
                  Assumes rapid capability advancement and faster organizational adoption
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Limitations</h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2">
              <li>AI capabilities evolving rapidly; assessments reflect current state</li>
              <li>Breakthrough capabilities may not follow historical trends</li>
              <li>Industry-specific AI adoption rates vary significantly</li>
            </ul>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-white font-bold">
              4
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Exposure Calculation</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Do</h3>
            <p className="text-gray-700 mb-4">
              Task-level automation potential is aggregated into an overall exposure score using
              weighted averaging. The weighting reflects typical time allocation across tasks
              for the given role.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Exposure Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-700">0-29</div>
                <div className="text-xs font-medium text-green-600">Low</div>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <div className="text-lg font-bold text-amber-700">30-49</div>
                <div className="text-xs font-medium text-amber-600">Moderate</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-700">50-69</div>
                <div className="text-xs font-medium text-orange-600">High</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-700">70-100</div>
                <div className="text-xs font-medium text-red-600">Very High</div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Limitations</h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2">
              <li>Does not account for industry-specific adoption barriers</li>
              <li>Regulatory constraints may significantly delay automation</li>
              <li>Organizational change management factors not modeled</li>
            </ul>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sources & References</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-medium">O*NET Database:</span>
                <span>Occupational information including task statements and skill requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">Bureau of Labor Statistics:</span>
                <span>Occupational Outlook Handbook and employment projections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">AI Benchmarks:</span>
                <span>HumanEval, SWE-bench, MMLU, and domain-specific evaluations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">Industry Research:</span>
                <span>McKinsey Global Institute, World Economic Forum, Brookings Institution</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <div className="bg-slate-800 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-3">Important Disclaimer</h2>
            <p className="text-slate-200 mb-4">
              This tool is designed to demonstrate a methodological approach to workforce analysis
              and is intended for educational and portfolio purposes. The results shown use sample
              data and should not be used for actual workforce planning decisions.
            </p>
            <p className="text-slate-200">
              Real-world workforce impact assessments should incorporate organizational context,
              industry-specific factors, regulatory considerations, and expert judgment beyond
              what any automated tool can provide.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
