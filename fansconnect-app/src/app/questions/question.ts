export interface Question {
  idolId: number,
  questionId: number;
  question: string;
  questionType: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
  selectedOption: number;
  explain: string,
  createBy: string
}
