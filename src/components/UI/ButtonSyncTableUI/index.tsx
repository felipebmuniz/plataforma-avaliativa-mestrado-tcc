import React from "react";
import { ButtonUI } from "../ButtonUI";
import { useTheme } from "@emotion/react";
import { BiSync } from "react-icons/bi";

const ButtonSyncTableUI = ({ onClick }: { onClick: () => void }) => {
  const theme = useTheme();
  return (
    <ButtonUI
      leftIcon={<BiSync size="1.5rem" />}
      bg={theme.colorPrimary200}
      color={theme.colorTextAddButton}
      onClick={onClick}
    >
      Atualizar Dados
    </ButtonUI>
  );
};

export default ButtonSyncTableUI;
