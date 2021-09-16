import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
/* --------------------------------------------------
----------------------- Fonts -----------------------
-------------------------------------------------- */

* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

/* --------------------------------------------------
--------------------- Variables ---------------------
-------------------------------------------------- */

:root {
  --main-padding-no-unit: 0.065;
  --main-padding: calc(100% * var(--main-padding-no-unit));

  @media only screen and (min-width: 90rem) {
    --main-padding: calc((100% - 90rem * (1 - 2 * var(--main-padding-no-unit))) / 2);
  }
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
