import { useEffect } from 'react';
import { Center, Divider, VStack } from '@chakra-ui/react';

import { useTheme } from '@emotion/react';
import { EditableUIQuestion } from '../EditableUIQuestion';

type CreateQuestionProps = {
  nameGroup: string;
  register: any;
  errors: any;
  fields: any;
  append: any;
  remove: any;
};

export function CreateQuestion({
  nameGroup,
  fields,
  append,
  remove,
  register,
  errors,
}: CreateQuestionProps) {
  const theme = useTheme();

  useEffect(() => {
    console.log('[fields] =>', fields);
  }, [fields]);

  return (
    <>
      {fields.map((field: any, index: any) => {
        return (
          <VStack width="100%" key={field.id}>
            <EditableUIQuestion
              nameGroup={nameGroup}
              index={index}
              field={field}
              append={append}
              remove={remove}
              register={register}
              errors={errors}
              name="statement"
              label="Pergunta"
              placeholder="Título da pergunta *"
            />
            <Center py="1rem" width="100%">
              <Divider />
            </Center>
          </VStack>
        );
      })}
    </>
  );
}
