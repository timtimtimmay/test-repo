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
            <p className="text-gray-700 mb-4">
              Our approach is grounded in the <strong>ILO Working Paper 140 (2025)</strong> framework for
              assessing generative AI exposure, combined with comprehensive occupational data from the
              U.S. Department of Labor&apos;s O*NET database.
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
              (Occupational Information Network) database. Our fuzzy search algorithm matches against
              <strong> 57,521 job titles</strong> (primary titles plus alternate titles) to find the best match.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Sources</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>O*NET Database 30.1</strong> (December 2025) - 1,016 occupations</li>
              <li>Bureau of Labor Statistics Standard Occupational Classification (SOC)</li>
              <li>57,521 searchable job titles (primary + alternates)</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Limitations</h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2">
              <li>O*NET is US-centric; international job titles may not match well</li>
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
              Each role is broken into its constituent tasks using O*NET task statements. We analyze
              up to <strong>25 tasks</strong> per occupation, capturing 77% of occupations completely.
              The database contains 18,796 total task statements across all occupations.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Task Classification Framework</h3>
            <p className="text-gray-700 mb-4">
              Based on ILO Working Paper 140, each task is classified into one of three categories:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-2">
                  Automate (70-100)
                </div>
                <p className="text-sm text-blue-900">
                  Tasks where AI can perform the core function with minimal human oversight
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 mb-2">
                  Augment (30-69)
                </div>
                <p className="text-sm text-purple-900">
                  Tasks where AI enhances human capability but human judgment remains essential
                </p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-2">
                  Retain (0-29)
                </div>
                <p className="text-sm text-emerald-900">
                  Tasks that remain primarily human due to physical, interpersonal, or judgment requirements
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Limitations</h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2">
              <li>Occupations with more than 25 tasks are partially analyzed</li>
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
            <h2 className="text-2xl font-bold text-gray-900">Six-Dimension Assessment</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Do</h3>
            <p className="text-gray-700 mb-4">
              Each task is evaluated using the ILO&apos;s six-dimensional assessment framework.
              Starting from a baseline score of 50, adjustments are made based on each dimension
              to arrive at an automation potential score (0-100).
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Assessment Dimensions</h3>
            <div className="space-y-4 mt-4">
              <div className="border-l-4 border-slate-300 pl-4">
                <h4 className="font-semibold text-gray-900">1. Task Structure</h4>
                <p className="text-sm text-gray-600">Structured, rule-based tasks score higher; unstructured tasks score lower</p>
              </div>
              <div className="border-l-4 border-slate-300 pl-4">
                <h4 className="font-semibold text-gray-900">2. Cognitive vs Physical</h4>
                <p className="text-sm text-gray-600">Pure information tasks score higher; physical/hands-on tasks score lower</p>
              </div>
              <div className="border-l-4 border-slate-300 pl-4">
                <h4 className="font-semibold text-gray-900">3. Routine vs Novel</h4>
                <p className="text-sm text-gray-600">Repetitive tasks score higher; unprecedented situations score lower</p>
              </div>
              <div className="border-l-4 border-slate-300 pl-4">
                <h4 className="font-semibold text-gray-900">4. Human Judgment Requirement</h4>
                <p className="text-sm text-gray-600">Objective criteria score higher; subjective judgment scores lower</p>
              </div>
              <div className="border-l-4 border-slate-300 pl-4">
                <h4 className="font-semibold text-gray-900">5. Interpersonal Intensity</h4>
                <p className="text-sm text-gray-600">Solo tasks score higher; relationship-dependent tasks score lower</p>
              </div>
              <div className="border-l-4 border-slate-300 pl-4">
                <h4 className="font-semibold text-gray-900">6. Stakes &amp; Accountability</h4>
                <p className="text-sm text-gray-600">Low-stakes tasks score higher; high-stakes decisions score lower</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Capability Level Scenarios</h3>
            <p className="text-gray-700 mb-4">
              Classification thresholds adjust based on the selected AI capability assumption:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  Conservative
                </span>
                <p className="text-sm text-gray-700">
                  Higher thresholds for automation (75+), more tasks classified as Retain
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  Moderate
                </span>
                <p className="text-sm text-gray-700">
                  Standard thresholds (70+/30+), balanced assessment of current capabilities
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  Bold
                </span>
                <p className="text-sm text-gray-700">
                  Lower thresholds for automation (65+), assumes rapid capability advancement
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Limitations</h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2">
              <li>AI capabilities evolving rapidly; assessments reflect analysis date</li>
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
              Task-level automation potential is aggregated into an overall exposure score.
              The distribution shows what percentage of tasks fall into each category
              (Automate, Augment, Retain), providing a clear picture of how the role will transform.
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
              <li>Technical potential differs from organizational readiness</li>
            </ul>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-white font-bold">
              5
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Skills Inference</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Do</h3>
            <p className="text-gray-700 mb-4">
              Based on the task classifications, we infer skill implications across three categories
              to provide actionable workforce development guidance:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="font-medium text-gray-700">Declining Skills</span>
                </div>
                <p className="text-sm text-gray-600">
                  Skills associated with automatable tasks that will decrease in value
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 ring-2 ring-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="font-medium text-purple-900">Evolving Skills</span>
                </div>
                <p className="text-sm text-purple-800">
                  Skills that need to transform for human-AI collaboration (highest training priority)
                </p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium text-emerald-900">Differentiating Skills</span>
                </div>
                <p className="text-sm text-emerald-800">
                  Uniquely human skills that become more valuable as AI handles routine work
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Limitations</h3>
            <ul className="list-disc list-inside text-amber-800 space-y-2">
              <li>Skills are inferred from task analysis, not validated against skill databases</li>
              <li>Individual development paths depend on current competencies</li>
              <li>Organizational context affects skill prioritization</li>
            </ul>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sources &amp; References</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-medium min-w-[180px]">O*NET Database 30.1:</span>
                <span>
                  December 2025 release. 1,016 occupations, 18,796 task statements, 57,521 job titles.
                  <a href="https://www.onetcenter.org/database.html" className="text-slate-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    onetcenter.org
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium min-w-[180px]">ILO Working Paper 140:</span>
                <span>
                  &quot;Generative AI and Jobs: A Refined Global Index of Occupational Exposure&quot; (2025).
                  Six-dimensional assessment framework.
                  <a href="https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html" className="text-slate-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    ilo.org
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium min-w-[180px]">Claude AI (Sonnet):</span>
                <span>
                  Anthropic&apos;s Claude claude-sonnet-4-20250514 model performs task classification and reasoning.
                  <a href="https://www.anthropic.com" className="text-slate-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    anthropic.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium min-w-[180px]">Bureau of Labor Statistics:</span>
                <span>Standard Occupational Classification (SOC) system for occupation taxonomy</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Implementation</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Analysis Pipeline</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Fuzzy search matches job title to O*NET occupation (~100ms)</li>
                  <li>Retrieve task statements from O*NET database (~100ms)</li>
                  <li>Send tasks to Claude API with ILO framework prompt (60-90s)</li>
                  <li>Parse structured JSON response with classifications and reasoning</li>
                  <li>Calculate exposure statistics and infer skill implications</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Streaming Response</h3>
                <p className="text-sm">
                  Results stream progressively via Server-Sent Events (SSE): O*NET match appears
                  in ~1 second, followed by task list, then full classification results as AI
                  analysis completes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cost &amp; Performance</h3>
                <p className="text-sm">
                  Each analysis costs approximately $0.05-0.06 in API usage and takes 60-90 seconds
                  to complete. Results are not cached, ensuring fresh analysis each time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <div className="bg-slate-800 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-3">Important Disclaimer</h2>
            <p className="text-slate-200 mb-4">
              This tool provides AI-generated analysis based on established occupational data and
              research frameworks. While it uses real O*NET data and ILO methodology, the classifications
              represent <strong>technical automation potential</strong>, not predictions of actual job changes.
            </p>
            <p className="text-slate-200">
              Real-world workforce impact depends on organizational context, industry adoption rates,
              regulatory factors, economic considerations, and change management capabilities that
              vary significantly across employers and regions.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
