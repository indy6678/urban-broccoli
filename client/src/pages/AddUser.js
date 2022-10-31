import React, {useState} from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const AddUser = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: ''});
    const [addUser, { error }] = useMutation(ADD_USER);

    // update state based on input changes to form
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormState({...formState, [name]: value,});
    };

    // submit form
    const handleFormSubmit = async (event) => {
        // prevent refresh
        event.preventDefault();

        try {
            const { data } = await addUser({
              variables: { ...formState }
            });
          
            Auth.login(data.addUser.token);
          } catch (e) {
            console.error(e);
          }
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-md-6">
                <div className="card">
                    <h4 className="text-center">Sign Up Here</h4>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <input className="form-input"
                            placeholder="Enter a username"
                            name='username'
                            type='username'
                            id='username'
                            value={formState.username}
                            onChange={handleChange}
                            />
                            <input className="form-input"
                            placeholder="Enter your email address"
                            name="email"
                            type="email"
                            id="email"
                            value={formState.email}
                            onChange={handleChange}
                            />
                            <input className="form-input"
                            placeholder="Enter a password"
                            name='password'
                            type='password'
                            id='password'
                            value={formState.password}
                            onChange={handleChange}
                            />
                            <button className="btn d-block w-100" type='submit'>
                                Submit
                            </button>
                            {error && <div>Sign up failed</div>}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddUser;