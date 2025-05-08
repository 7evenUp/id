import IdIcon from "../Icons/ID"

import './styles.css'

const AuthContainer = () => {
  return (
    <div className="container">
      <IdIcon className="logo" />
      <h2 className="title">Sign in to Crypton</h2>
      <p className="description">Welcome back! Please sign in to continue</p>
      <div className="auth_variants">
        <button>Web3 Wallet</button>
        <button>Google</button>
        <button>Apple</button>
      </div>
      <p className="divider">or</p>
      <label className="label">
        <span>Email address</span>
        <input type="email" />
      </label>
      <button className="button">Continue</button>
    </div>
  )
}

export default AuthContainer
