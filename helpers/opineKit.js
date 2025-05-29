import blogConfig from "blog.config.mjs";

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
  if(blogConfig?.opineKit?.siteId) {
    window.opineKit.config(opineKitConfig).start()
  } else {
    // eslint-disable-next-line no-console
    console.debug("OpineKit siteId is not set. Skipping initialization.");
  }
}

export default {
    start,
    onThemeChange
}
