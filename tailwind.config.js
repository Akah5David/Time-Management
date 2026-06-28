/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary : "rgb(51, 27, 27)",
        secondary: "rgb(92, 61, 61)",
      },
      width: {
        buttonWidth: "200px",
        buttonHeight: "150px",
        div1Width: "30%",
        div2Width: "65%",
        div1Height: "90%",
        button1Width: "",
        div3width: "90%"
      },
      lineHeight:{
        buttonLineHeight: "150px",
      },
      margin: {
        divMargin: "50px",
      },
      padding:{
        horizPadding: "30px",
        vertPadding: "50px"
      },
      borderColor:{
        bottomColor: "rgb(17, 2, 2)"
      }
    },
  },
  plugins: [],
}

