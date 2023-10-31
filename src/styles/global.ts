import { css } from '@emotion/react';

export default css`
  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #002c55 #f4f7f9;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #f4f7f9;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #002c55;
    border-radius: 20px;
    border: 3px solid #f4f7f9;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body,
  main,
  #__next {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background: #f4f7f9;
  }
`;
