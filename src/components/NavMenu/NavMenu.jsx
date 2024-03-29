import PropType from "prop-types";
import styles from "./NavMenu.module.css";
import { Link, useLocation } from "react-router-dom";
import { AppstoreAddOutlined, AppstoreOutlined, BulbFilled, BulbOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { useRecoilState } from "recoil";
import { currentThemeState } from "../../state";

// Making this constant here because I'm including external components (Icons) in the objects
const MAIN_MENU = [
  {
    url: "/",
    icon: <AppstoreAddOutlined />,
    text: "Give Consent",
    urlAlt: "/give-consent",
  },
  {
    url: "/consents/",
    icon: <AppstoreOutlined />,
    text: "Consents",
  },
  
]

export const NavMenu = ({
  className,
  style,
}) => {
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);
  const { pathname } = useLocation();
  const currentUrlClass = (item) => {
    return pathname === item.url || pathname === item.urlAlt ? styles.current : ""
  }

  const handleThemeSwitch = (checked) => {
    setCurrentTheme(checked ? "light" : "dark");
  }

  return (
    <nav
      className={`${styles.navMenu} ${className}`}
      style={{ ...style }}
    >
      {MAIN_MENU.map((item, index) => (
        <Link
          key={`${item.url}${index}`}
          to={item.urlAlt || item.url}
          className={currentUrlClass(item)}
        >
          {item.icon}
          <p>{item.text}</p>
        </Link>
      ))}
      <span className={styles.themeSwitchContainer}>
        <BulbOutlined />
        <Switch
          checked={currentTheme === "light"}
          onChange={handleThemeSwitch}
        />
        <BulbFilled />
      </span>
    </nav>
  )
}

NavMenu.defaultProps = {
  className: "",
  style: {},
}

NavMenu.propTypes = {
  className: PropType.string,
  style: PropType.shape({}),
}