# Workforce Task Intelligence

A web application that analyzes job roles for AI automation exposure using O*NET data and ILO-based classification framework.

## Overview

This tool helps HR leaders and workforce strategists understand how AI might impact specific job roles by:
- Matching job titles to O*NET occupations
- Breaking down roles into constituent tasks
- Classifying each task as Automate, Augment, or Retain
- Calculating overall automation exposure scores
- Providing detailed reasoning for each classification

**Built with:** Next.js, TypeScript, Tailwind CSS, Claude API, O*NET 30.1 Database

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/settings/keys))

### Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your API key:**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local

   # Edit .env.local and add your Anthropic API key
   # ANTHROPIC_API_KEY=your_actual_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Try analyzing "Financial Analyst" or "Registered Nurse"

## Project Structure

- `data/` - O*NET occupation data and ILO classification criteria
- `lib/` - Core utilities (O*NET search, task classification)
- `app/api/analyze/` - API endpoint for job analysis
- `components/` - React UI components
- `scripts/` - Data processing scripts

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Complete development summary and technical details
- **[TESTING.md](./TESTING.md)** - Testing guide and troubleshooting

## Features

✅ **Real O*NET Data** - 1,016 occupations, 18,796 tasks, 57,521 searchable job titles
✅ **ILO-Based Framework** - Research-grounded 6-dimensional classification
✅ **Three Capability Levels** - Conservative, Moderate, Bold scenarios
✅ **Detailed Reasoning** - Transparent explanation for each classification
✅ **Visual Analytics** - Charts showing automation exposure distribution

## License & Attribution

- **O*NET Data:** Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **ILO Framework:** Based on [ILO Working Paper 140 (2025)](https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html)

---

