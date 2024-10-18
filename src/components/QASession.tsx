"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button1"; // Ensure the path is correct
import { Card } from "@/components/ui/card"; // Adjust import to import Card
import { fetchSimilarPackages } from '@/services/fetchPackages'; // Update import
import { Question, Answer, PackageInfo } from '@/types/QATypes';

// Define questions for the quiz
const questions: Question[] = [
  {
    id: 1,
    text: 'What is the primary purpose of the package?',
    options: ['Frontend development', 'Backend development', 'Testing and QA', 'Build and deployment', 'Data manipulation']
  },
  {
    id: 2,
    text: 'Which programming paradigm does the package primarily support?',
    options: ['Functional', 'Object-oriented', 'Reactive', 'Asynchronous', 'Serverless']
  },
  {
    id: 3,
    text: 'What type of application or system is the package designed for?',
    options: ['Web applications', 'Mobile applications', 'Desktop applications', 'CLI tools', 'IoT devices']
  },
  {
    id: 4,
    text: 'Which specific technology or framework does the package integrate with?',
    options: ['React', 'Vue.js', 'Angular', 'Node.js', 'Express.js']
  },
  {
    id: 5,
    text: 'What is the main functionality provided by the package?',
    options: ['State management', 'API integration', 'UI components', 'Authentication', 'Data visualization']
  },
];

export default function QASession() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [similarPackages, setSimilarPackages] = useState<PackageInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, { questionId: currentQuestion + 1, answer }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);
      try {
        const packages = await fetchSimilarPackages(newAnswers); // Fetch similar packages
        setSimilarPackages(packages);
        setShowResults(true); // Show results after fetching packages
      } catch (error) {
        console.error('Error during package fetching:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSimilarPackages([]);
    setShowResults(false);
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
      <Card.Header className="border-b border-gray-700">
        <Card.Title className="text-2xl font-bold text-white">
          {showResults ? "Similar NPM Packages" : `Question ${currentQuestion + 1} of ${questions.length}`}
        </Card.Title>
      </Card.Header>
      <Card.Content className="pt-6">
  {loading ? (
    <div>Loading package info...</div>
  ) : showResults ? (
    similarPackages.length > 0 ? (
      <>
        <h2 className="text-2xl font-semibold mt-4">Similar NPM Packages</h2>
        <div className="grid gap-4">
  {similarPackages.map(pkg => (
    <Card key={pkg.name} className="bg-gray-700 text-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
      <p>{pkg.description}</p>
      <p>
        Website: <a href={pkg.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{pkg.website}</a>
      </p>
    </Card>
  ))}
</div>
      </>
    ) : (
      <div>No similar packages found.</div>
    )
  ) : (
    <>
      <h2 className="text-xl font-semibold mb-6 text-white">{questions[currentQuestion].text}</h2>
      <div className="grid gap-3">
        {questions[currentQuestion].options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            variant="outline"
            className="w-full justify-start text-left py-6 text-lg bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600"
          >
            {option}
          </Button>
        ))}
      </div>
    </>
  )}
</Card.Content>
      {showResults && (
        <Card.Footer>
          <Button onClick={resetQuiz} className="w-full bg-primary hover:bg-primary/90 text-white">
            Start Over
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
