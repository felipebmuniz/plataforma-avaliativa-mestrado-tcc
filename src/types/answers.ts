export interface answersList {
  accessToken: string;
}

export interface answersCreate {
  formId: string;
  evaluationId: string;
  classId: string;
  answers: {
    optionId: string;
    questionId: string;
  }[];
}
