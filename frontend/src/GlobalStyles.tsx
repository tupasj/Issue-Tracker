import { createGlobalStyle } from 'styled-components';

const CSSReset = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

const Styles = createGlobalStyle`
:root {
    --gainsboro: #D8DBE2;
    --light-steel-blue: #A9BCD0;
    --cadet-blue: #58A4B0;
    --charcoal: #373F51;
    --eerie-black: #1B1B1E;
	--white: #ffffff;
	--black: #000000;
	--green: #16A34A;
	--dark-green: #15803D;
	--extra-light-gray: #fafafa;
	--light-gray: #e5e5e5;
	--light-medium-gray: #A3A3A3;
	--medium-gray: #737373;
	--light-blue: #BAE6FD;
	--extra-light-blue: #E0F2FE;
	--red: #DC2626;
	--dark-red: #B91C1C;
	--orange: #F97316;
	--yellow: #FBBF24;
	--blue: #1D4ED8;
	--light-blue: #3B82F6;
	--dark-purple: #473099;
}
html {
	box-sizing: border-box;
}
html, body, #root {
	min-height: 100vh;
	font-family: Geneva, Verdana, sans-serif;
}
`;

type Props = {
  children: React.ReactNode;
};

const GlobalStyles = ({ children }: Props) => {
  return (
    <>
      <CSSReset />
      <Styles />
      {children}
    </>
  );
};

export { GlobalStyles };
