import React from "react";
import PropType from "prop-types";

import styles from "./Section.module.css";

/** 
 * Sessão agrupando parte do layout
 * 
 * @param {object} props
 * @param {string} props.className
 * @param {object} props.style
 * @param {element | string} props.title
 * @param {boolean} props.retractile - Needs title to work
 * @param {boolean} props.defaultOpen
 * @param {element} props.children
 * @param {string} props.contentMaxHeight
 * @param {string} props.headerClass
 * @param {string} props.fullSectionClass
*/
export const Section = ({
  className,
  style,
  title,
  retractile,
  defaultOpen,
  children,
  contentMaxHeight,
  headerClass,
  fullSectionClass,
}) => {
  const [isOpen, setIsOpen] = React.useState(!title || !retractile || defaultOpen);
  const titleNode = React.useMemo(() => {
    if (!title) {
      return null;
    }

    if (typeof title === "object") {
      return title;
    }

    return <h4>{title}</h4>;
  }, [title]);

  const toggleSection = React.useCallback(() => {
    const alwaysOpen = !title || !retractile;
    setIsOpen(!isOpen || alwaysOpen);
  }, [isOpen, retractile, title]);

  return (
    <section
      className={`${styles.section} ${fullSectionClass}`}
    >
      {titleNode && (
        <header
          className={`${styles.titleContainer} ${headerClass} ${retractile ? styles.toggable : ""}`}
          onClick={toggleSection}
        >
          {retractile && (
            <span
              className={`${styles.openMark} ${isOpen ? styles.open : ""}`}
            >
              &#9654;
            </span>
          )}
          {titleNode}
        </header>
      )}

      <div
        className={`${styles.contentContainer} ${className} ${!isOpen ? styles.closed : ""}`}
        style={{
          ...style,
          "--maxHeight": contentMaxHeight,
        }}
      >
        {children}
      </div>
    </section>
  );
}

Section.defaultProps = {
  className: "",
  style: {},
  title: null,
  retractile: false,
  defaultOpen: false,
  contentMaxHeight: "20rem",
  headerClass: "",
  fullSectionClass: "",
}

Section.propTypes = {
  className: PropType.string,
  style: PropType.shape({}),
  title: PropType.node,
  retractile: PropType.bool,
  defaultOpen: PropType.bool,
  children: PropType.node.isRequired,
  contentMaxHeight: PropType.string,
  headerClass: PropType.string,
  fullSectionClass: PropType.string,
}