import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState({});
    
    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const [ addUser, { loading } ] = useMutation(REGISTER_USER, {
        
        update(_, { data: { register: userData } }) {
            context.login(userData);
            navigate('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }
   
    return(
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder='Username..'
                        name='username'
                        type='text'
                        value={values.username}
                        isInvalid={errors.username ? true : false}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        aria-label="Email"
                        placeholder='Email..'
                        name='email'
                        type='email'
                        value={values.email}
                        isInvalid={errors.email ? true : false}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        aria-label="Password"
                        placeholder='Password..'
                        name='password'
                        type='password'
                        autoComplete="on"
                        value={values.password}
                        isInvalid={errors.password ? true : false}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        aria-label="Confirm Password"
                        placeholder='Confirm Password..'
                        name='confirmPassword'
                        type='password'
                        autoComplete="on"
                        value={values.confirmPassword}
                        isInvalid={errors.confirmPassword ? true : false}
                        onChange={onChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <Alert variant="danger" style={{marginTop: "10px"}}>
                    <ul>
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </Alert>
            )}
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
        ) {
        id
        email
        username
        createdAt
        token
        }
    }
`;

export default Register;