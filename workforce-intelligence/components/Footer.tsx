export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Attribution */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Built by</span>
            <a
              href="https://aistrategypractitioner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 hover:text-slate-700 transition-colors"
            >
              Tim Dickinson
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="https://aistrategypractitioner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              aistrategypractitioner.com
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-500 max-w-md">
              This is a methodology demonstration for portfolio purposes.
              Results are illustrative and based on sample data, not production AI analysis.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Tim Dickinson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
