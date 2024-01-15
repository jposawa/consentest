import { Model, createServer } from "miragejs";
import { NavMenu } from "./components/";
import { Router } from "./pages";

import styles from "./App.module.css";
import { useRecoilValue } from "recoil";
import { currentThemeState } from "./state";
import { ConfigProvider } from "antd";
import { THEME_COLORS } from "./constants";

createServer({
  models: {
    consent: Model,
  },

  seeds(server) {
    server.create("consent", {
      name: "Yoda",
      email: "yoda@jedi.holo.net",
      consentIds: ["newsletter"],
    })
    server.create("consent", {
      name: "Qui-Gon",
      email: "qgjinn@jedi.holo.net",
      consentIds: ["newsletter", "targetedAds", "anomStatistic"],
    })
    server.create("consent", {
      name: "Obi-Wan",
      email: "benkenobi@jedi.holo.net",
      consentIds: ["newsletter", "anomStatistic"],
    })
  },

  routes() {
    this.get("/api/consents", (schema) => (
      schema.consents.all()
    ))

    this.post("/api/consents", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);

      return schema.consents.create(attrs);
    })

    this.put("/api/consents", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const consent = schema.consents.find(Number(attrs.id));

      consent.update(attrs);
    })
  },
});

function App() {
  const currentTheme = useRecoilValue(currentThemeState);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: THEME_COLORS[currentTheme].background,
          colorTextBase: THEME_COLORS[currentTheme].text,
        }
      }}
    >
      <main className={`${styles.mainContainer} ${currentTheme}Theme`}>
        <section className={styles.pageContainer}>
          <Router />
        </section>

        <NavMenu className={styles.mainMenu} />
      </main>
    </ConfigProvider>

  )
}

export default App
