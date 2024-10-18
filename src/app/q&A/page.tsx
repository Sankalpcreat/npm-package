import Link from 'next/link';
import QASession from '@/components/QASession';

export default function QAPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
    
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
          <pattern id="chart" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M0 0 L50 100 L100 50 L150 120 L200 80" fill="none" stroke="rgba(255,0,0,0.1)" strokeWidth="2"/>
            <circle cx="50" cy="100" r="3" fill="rgba(255,0,0,0.2)"/>
            <circle cx="100" cy="50" r="3" fill="rgba(255,0,0,0.2)"/>
            <circle cx="150" cy="120" r="3" fill="rgba(255,0,0,0.2)"/>
          </pattern>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#chart)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Q&A Session</h1>
        
        {/* Q&A Session wrapped in a clickable area */}
        <div className="cursor-pointer">
          <QASession />
        </div>

        {/* Optional back button */}
        <Link href="/">
          <button className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
