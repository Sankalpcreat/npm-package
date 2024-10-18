import { Answer, PackageInfo } from "@/types/QATypes";
interface NPMPackage {
  package: {
    name: string;
    description: string | null; // Can be null if no description is provided
    links: {
      npm: string;
    };
    downloads?: number; // Optional if not always available
  };
}

interface NPMSearchResult {
  objects: NPMPackage[];
}
// Fetch similar packages from the npm registry based on user answers
export async function fetchSimilarPackages(answers: Answer[]): Promise<PackageInfo[]> {
  const searchTerms = generateSearchTerms(answers);
  console.log("Generated search terms:", searchTerms);

  try {
    // Perform multiple searches, one for each keyword
    const packagePromises = searchTerms.map(async (term) => {
      const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(term)}&size=3`);
      if (!response.ok) {
        throw new Error(`Failed to fetch package data for term "${term}": ${response.status} ${response.statusText}`);
      }
      const data:NPMSearchResult = await response.json();
      return data.objects.map((pkg: NPMPackage) => ({
        name: pkg.package.name,
        description: pkg.package.description || 'No description available',
        website: pkg.package.links.npm || `https://www.npmjs.com/package/${pkg.package.name}`,
        downloads: pkg.package.downloads || 0, // You can fetch more detailed download stats separately if needed
      }));
    });

    // Await for all the search results
    const results = await Promise.all(packagePromises);

    // Flatten the results array and remove duplicates by package name
    const allPackages = results.flat();
    const uniquePackages = Array.from(new Map(allPackages.map(pkg => [pkg.name, pkg])).values());

    // Sort by downloads or relevance (if downloads is fetched)
    const sortedPackages = uniquePackages.sort((a, b) => b.downloads - a.downloads);

    // Return the top 3 packages
    return sortedPackages.slice(0, 5);

  } catch (error) {
    console.error('Error fetching similar packages:', error);
    return []; // Return an empty array in case of error
  }
}

// Generate search terms based on the answers provided in the Q&A session
function generateSearchTerms(answers: Answer[]): string[] {
  const keywordMapping: { [key: string]: string } = {
    'Frontend development': 'frontend',
    'Backend development': 'backend',
    'Testing and QA': 'testing',
    'Build and deployment': 'build',
    'Data manipulation': 'data',
    'Functional': 'functional',
    'Object-oriented': 'object-oriented',
    'Reactive': 'reactive',
    'Asynchronous': 'async',
    'Serverless': 'serverless',
    'Web applications': 'web',
    'Mobile applications': 'mobile',
    'Desktop applications': 'desktop',
    'CLI tools': 'cli',
    'IoT devices': 'iot',
    'React': 'react',
    'Vue.js': 'vue',
    'Angular': 'angular',
    'Node.js': 'node',
    'Express.js': 'express',
    'State management': 'state',
    'API integration': 'api',
    'UI components': 'ui',
    'Authentication': 'auth',
    'Data visualization': 'visualization',
  };

  // Extract the relevant keywords from answers
  return answers.map(answer => keywordMapping[answer.answer]).filter(Boolean);
}
