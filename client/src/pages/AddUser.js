import React, {useState} from "react";

const AddUser = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: ''});

    // update state based on input changes to form
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormState({...formState, [name]: value,});
    };

    // submit form
    const handleFormSubmit = async (event) => {
        // prevent refresh
        event.preventDefault();
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-md-6">
                <div className="card">
                    <h4 className="card-header">Sign Up Here</h4>
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
                            placeholder='**************'
                            name='password'
                            type='password'
                            id='password'
                            value={formState.password}
                            onChange={handleChange}
                            />
                            <button className="btn d-block w-100" type='submit'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddUser;