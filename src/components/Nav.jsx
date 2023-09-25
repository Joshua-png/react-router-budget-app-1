// ASSETS
import { Form, NavLink } from "react-router-dom";
import logomark from "../assets/logomark.svg";
import { FaRegTrashAlt } from "react-icons/fa";
const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="logomark" height={30} />
        <span>BudgetyBudget</span>
      </NavLink>

      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(e) => {
            if (!confirm("Are you sure you want to delete user and all data")) {
              e.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
            <FaRegTrashAlt />
          </button>
        </Form>
      )}
    </nav>
  );
};
export default Nav;
