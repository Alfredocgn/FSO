

import React from 'react'

export const Login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username:
          <input type='text' value={props.username} placeholder='Username' onChange={({target}) => props.setUsername(target.value)} />
      </div>
      <div>
        password:
        <input type="password" value={props.password} placeholder='Password' onChange={({target}) => props.setPassword(target.value)} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}
