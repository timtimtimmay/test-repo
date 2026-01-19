export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Attribution */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Built by</span>
            <a
              href="https://www.linkedin.com/in/tim-dickinson-22319525/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-600 hover:text-amber-700 transition-colors"
            >
              Tim Dickinson
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-500 max-w-md">
              Analysis powered by O*NET 30.1 occupational data and ILO research methodology.
              Results reflect technical automation potential, not organizational adoption timelines.
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
