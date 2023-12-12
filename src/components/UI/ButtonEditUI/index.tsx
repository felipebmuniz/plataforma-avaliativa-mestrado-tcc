import React from "react";
import { useTheme } from "@emotion/react";
import { BiEdit, BiSync } from "react-icons/bi";
import { HStack, IconButton } from "@chakra-ui/react";

const ButtonEditUI = ({ onClick }: { onClick: () => void }) => {
  const theme = useTheme();
  return (
    <IconButton
      aria-label="delete-icon-modal"
      icon={<BiEdit />}
      onClick={onClick}
      size="lg"
    />
  );
};

export default ButtonEditUI;
