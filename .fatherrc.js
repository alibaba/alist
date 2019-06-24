export default {
    doc: {
      dest: 'dist',
      themeConfig: {
        logo: {
          src: "/public/bg.svg",
          width: 48
        }
      },
      title: "NoPage",
      indexHtml: './index.html',
      public: './public',
      hashRouter: true,
      base: "/nopage",
    },
};
