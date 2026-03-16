import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login as authLogin } from '../store/authSlice'
import authService from "../Appwrite/Auth"

function Login() {
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const login = async (data) => {
        setError('')
        try {
            const session = authService.login(data)
            if(session) {
                const userData = authService.getCurrentUser()
                if (userData){
                    dispatch(authLogin({ userData }))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="login-container">

      <div className="login-left">
        <Logo width="120px" />
        <h1>Welcome Back</h1>
        <p>Sign in to continue to your account</p>
      </div>

      <div className="login-right">
        <div className="login-card">

          <h2>Login</h2>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit(login)}>

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
                        "Email must be an ADYPU email (@adypu.edu.in)",
                    }
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

            <button type="submit" className="login-btn">
              Sign In
            </button>

          </form>

          <p className="signup-text">
            Don’t have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login