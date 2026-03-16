import { useNavigate } from "react-router-dom";
import authService from "../Appwrite/Auth"
import { useDispatch } from "react-redux";


function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const create = async(data) => {
        setError('')
        try {
            const account = authService.createAccount(data)
            if (account) {
                
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="signup-container">

      <div className="signup-card">

        <div className="logo-container">
          <Logo width="120px" />
        </div>

        <h2 className="signup-title">Sign up to create account</h2>

        <p className="signin-text">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit(create)}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                    matchPattern: (value) =>
                        /^[a-zA-Z0-9._%+-]+@adypu\.edu\.in$/.test(value) ||
                        "Email must be an ADYPU email (...@adypu.edu.in)",
                    },
              })}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}


export default SignUp