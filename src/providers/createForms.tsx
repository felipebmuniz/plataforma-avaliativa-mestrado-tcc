import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { CreateFormsContext } from '@/contexts/createForms';
import { useTheme } from '@emotion/react';
import * as yup from 'yup';

interface CreateFormsProviderProps {
  children: ReactNode;
}

interface IValueQuestions {
  statement: string;
  type: number;
  options: IValueOptions[];
  formId?: string;
}

interface IValueOptions {
  value: string;
  order: number;
  questionId?: string;
}

interface IValuesForm {
  title: string;
  questions: IValueQuestions[];
}

function CreateFormsProvider({ children }: CreateFormsProviderProps) {
  const [defaultValuesForm, setDefaultValuesForm] = useState<IValuesForm>({
    title: '',
    questions: [],
  });

  const [schemaForm, setSchemaForm] = useState(() => {
    yup.object({
      title: yup.string().required('Deve ser informado um título!'),
      questions: yup
        .array(
          yup.object({
            statement: yup
              .string()
              .required('Deve ser informado uma pergunta!'),
            type: yup.number().required('Deve ser informado o tipo!'),
            options: yup
              .array(
                yup.object({
                  value: yup.string().required('Deve ser informado a opção!'),
                  order: yup.number().required('Deve ser informado a posição!'),
                }),
              )
              .required('Deve ser informado um Opção!'),
          }),
        )
        .required('Deve ser informado um Pergunta!'),
    });
  });

  const createNewQuestion = useCallback(() => {}, []);

  const createNewOptionQuestion = useCallback(() => {}, []);

  return (
    <CreateFormsContext.Provider value={{}}>
      {children}
    </CreateFormsContext.Provider>
  );
}

export { CreateFormsProvider };
