export interface LoginResponse {
  accessToken: string;
}

export interface AcessesLoginResponse {
  email: string;
  password: string;
}

export interface ResponseUserEvaluationForm {
  accessToken: string;
  clasId: string;
  evaluationId: string;
  formId: string;
}

// accessToken
// :
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxODdjMWY2OC0yNDllLTQzMjctOTlmOS0yOTU0MzU1Y2RmNWIiLCJuYW1lIjoiMTg3YzFmNjgtMjQ5ZS00MzI3LTk5ZjktMjk1NDM1NWNkZjViIiwicm9sZSI6IlN0dWRlbnQiLCJuYmYiOjE3MDE3Mjk4MDgsImV4cCI6MTcwMTgxNjIwOCwiaWF0IjoxNzAxNzI5ODA4fQ.juOJWZm84pEyyfQCYNLxKwna8khlmvkyziYEt8FEMVA"
// clasId
// :
// "52edab0b-26c4-4f6e-b13f-23b839b8d1dc"
// evaluationId
// :
// "2f9faa33-d9fe-4bd8-b038-b8324c441979"
// formId
// :
// "98637148-837b-417a-b004-62321ce4113d"
