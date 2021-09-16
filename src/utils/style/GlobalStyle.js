import { createGlobalStyle } from 'styled-components';
import { COLORS } from './COLORS.js';

export const GlobalStyle = createGlobalStyle`
/* --------------------------------------------------
----------------------- Fonts -----------------------
-------------------------------------------------- */

* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: ${COLORS.font};
}

/* --------------------------------------------------
--------------------- CSS reset ---------------------
-------------------------------------------------- */

*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
}

a {
  text-decoration: inherit;
  color: inherit;
}

button {
  background: inherit;
  border: inherit;
  cursor: pointer;
  font-size: inherit;
  text-decoration: inherit;
}

/* --------------------------------------------------
------------------- Screen-reader -------------------
-------------------------------------------------- */

.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
`;
