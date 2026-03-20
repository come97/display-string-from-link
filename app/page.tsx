"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function QueryDisplay() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("q");
  const [copied, setCopied] = useState(false);

  if (!raw) {
    return (
      <div className="text-center text-gray-400 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-200">Query Viewer</h1>
        <p>
          Add a <code className="bg-gray-800 px-2 py-1 rounded text-sm">?q=</code> parameter to the URL to display a query.
        </p>
        <p className="text-sm text-gray-500">
          Example: <code className="bg-gray-800 px-2 py-1 rounded text-xs">/?q=SELECT%20*%20FROM%20table</code>
        </p>
      </div>
    );
  }

  let query: string;
  try {
    query = decodeURIComponent(raw);
  } catch {
    query = raw;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-300">Query</h1>
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600"
        >
          {copied ? "✅ Copied!" : "📋 Copy to clipboard"}
        </button>
      </div>
      <pre className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-sm leading-relaxed text-gray-100 font-[family-name:var(--font-geist-mono)] whitespace-pre-wrap break-words overflow-y-auto max-h-[70vh]">
        {query}
      </pre>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center p-6 pb-12">
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        <QueryDisplay />
      </Suspense>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs tracking-widest uppercase text-white font-bold select-none">
        <span className="h-px w-8 bg-gray-600" />
        Coverage Team
        <span className="h-px w-8 bg-gray-600" />
      </div>
    </div>
  );
}
