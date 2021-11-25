export interface Question {
  questionId: number;
  question: string;
  questionType: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
  selectedOption: number;
}
