import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';


function PostForm() {

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [ createPost, { error } ] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            proxy.writeQuery({ 
                query: FETCH_POSTS_QUERY, 
                data: {
                getPosts: [result.data.createPost, ...data.getPosts],
              },
            
            });
            values.body = ''
        }
    })

    function createPostCallback() {
        createPost()
    } 

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Group className="mb-3">
                    <Form.Control
                        placeholder='Hi World!'
                        name='body'
                        value={values.body}
                        onChange={onChange}
                        isInvalid={error ? true : false}
                    />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
        </Form>
         {error && (
            <Alert variant="danger" style={{marginTop: "10px"}}>
                <ul>
                    {error.graphQLErrors.map(({ message }, i) => (
                    <li key={i}>{message}</li>
                    ))}
                </ul>
            </Alert>
        )}
        </>
    );
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id 
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`

export default PostForm;