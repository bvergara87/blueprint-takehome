// TODO: for simplicity I added the types here but we would want to move these to a shared library with Polymorphic types as not all assessments will have the same fields.
export interface ScreenerAnswer {
  value: number;
  question_id: string;
  section_id: string; // added this to keep track of the section id for the answer not explicity stated in the exercise's example
}

export interface ScreenerDomainMapping {
  question_id: string;
  domain: string;
}

export interface ScreenerDomainScore {
  [key: string]: number;
}

export interface ScreenerSectionQuestion {
  id: string;
  title: string;
  questionId: string;
  sectionId: string;
}

export interface ScreenerSectionAnswerOption {
  value: number;
  title: string;
}

export interface ScreenerSection {
  id: string;
  screenerId: string;
  type: string;
  title: string;
  questions: ScreenerSectionQuestion[];
  answerOptions: ScreenerSectionAnswerOption[];
}

export interface ScreenerQuestionResponse {
  questionTitle: string;
  givenAnswerTitle: string;
  questionId: string;
  questionIndex: number;
}
