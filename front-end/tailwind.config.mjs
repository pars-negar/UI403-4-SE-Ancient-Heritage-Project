export default {
    mode: 'jit',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        // safelist: ['font-koodak'],
        // fontFamily: {
        //   vazir: ['Vazirmatn', 'sans-serif'],
        //   koodak: ['Koodak', 'sans-serif'],
        // }, 
        // fontWeight: {
        //   thin: '100',
        //   extraLight: '200',
        //   light: '300',
        //   regular: '400',
        //   medium: '500',
        //   semiBold: '600',
        //   bold: '700',
        //   black: '900',
        // }

      },
    },
    plugins: [],
    // Ensure Tailwind purges unused CSS in production automatically
  }