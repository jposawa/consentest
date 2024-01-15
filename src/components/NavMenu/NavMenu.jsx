import PropType from "prop-types";
import styles from "./NavMenu.module.css";
import { Link, useLocation } from "react-router-dom";
import { AppstoreAddOutlined, AppstoreOutlined } from "@ant-design/icons";

// Making this constant here because I'm including external components (Icons) in the objects
const MAIN_MENU = [
  {
    url: "/",
    icon: <AppstoreOutlined />,
    text: "Consents",
    urlAlt: "/consents/",
  },
  {
    url: "/give-consent",
    icon: <AppstoreAddOutlined />,
    text: "Give Consent",
  },
]

export const NavMenu = ({
  className,
  style,
}) => {
  const { pathname } = useLocation();
  const currentUrlClass = (item) => {
    return pathname === item.url || pathname === item.urlAlt ? styles.current : ""
  }

  return (
    <nav
      className={`${styles.navMenu} ${className}`}
      style={{ ...style }}
    >
      {MAIN_MENU.map((item, index) => (
        <Link
          key={`${item.url}${index}`}
          to={item.url}
          className={currentUrlClass(item)}
        >
          {item.icon}
          <p>{item.text}</p>
        </Link>
      ))}
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