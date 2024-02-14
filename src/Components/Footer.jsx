import styles from "./Footer.module.css";
import PropTypes from "prop-types";

function Footer({ children }) {
  return (
    <footer className={styles.footer}>
      {children}
      <p>CopyRights@TripWise</p>
    </footer>
  );
}

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer;
