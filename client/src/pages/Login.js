import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState({});
    
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [ loginUser, { loading } ] = useMutation(LOGIN_USER, {
        
        update(_, { data: { login: userData }}) {
            console.log(userData)
            context.login(userData);
            navigate('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }
   
    return(
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder='Username..'
                        name='username'
                        type='text'
                        value={values.username || '' }
                        isInvalid={errors.username ? true : false}
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
                        value={values.password || ''}
                        isInvalid={errors.password ? true : false}
                        onChange={onChange}
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Login
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
        id
        email
        username
        createdAt
        token
        }
    }
`;

export default Login;