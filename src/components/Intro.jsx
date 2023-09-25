import { Form } from "react-router-dom";
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Owning your own budgeting ideas is financial freedom. Start your
          journey now
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            placeholder="What is your name"
            aria-label="What is your name"
            required
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Hero Image" />
    </div>
  );
};
export default Intro;
