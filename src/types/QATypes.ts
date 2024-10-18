
export interface Question {
    id: number;
    text: string;
    options: string[];
  }
  

  export interface Answer {
    questionId: number;
    answer: string;
  }
  

  export interface PackageInfo {
    name: string;
    description: string;
    website: string;
    downloads: number;
  }
  