const blogConfig = require("blog.config.mjs");

let opineKitConfig = blogConfig.opineKit;

const onThemeChange = (theme) => {

    const newConfig = {
        ...opineKitConfig,
        theme: theme === "dark" ? opineKitConfig.darkTheme : opineKitConfig.lightTheme,
        widgetStyles: {
          ...opineKitConfig.widgetStyles,
          background: theme === "dark" ? "#111" : "#fff",
        }
      }

      opineKitConfig = newConfig;
      window.opineKit.config(opineKitConfig)
}

const start = () => {
    window.opineKit.config(opineKitConfig).start()
}

export default {
    start,
    onThemeChange
}
