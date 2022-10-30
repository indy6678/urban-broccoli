import React, {useState} from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignIn = () => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    // initialize login_user mutation
    const [login, { error }] = useMutation(LOGIN_USER);

    // update state based on input changes made to form
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormState({...formState, [name]: value,});
    };

    // submit the form
    const handleFormSubmit = async (event) => {
        // prevent refresh
        event.preventDefault();

        try {
            const { data } = await login({
              variables: { ...formState }
            });
          
            //takes token and sets it to local storage
            Auth.login(data.login.token);
          } catch (e) {
            console.error(e);
          }
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-md-6">
                <div className="card">
                    <h4 className="">Log in here if you have an account. Click 'Sign Up' to create one if you don't!</h4>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <input className="form-input"
                            placeholder="Enter your email address"
                            name="email"
                            type="email"
                            id="email"
                            value={formState.email}
                            onChange={handleChange}
                            />
                            <input className="form-input"
                            placeholder='Enter your password'
                            name='password'
                            type='password'
                            id='password'
                            value={formState.password}
                            onChange={handleChange}
                            />
                            <button className="btn d-block w-20" type='submit'>
                                Submit
                            </button>
                        </form>
                        {error && <div>Login failed</div>}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignIn;