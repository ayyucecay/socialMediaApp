import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillTrashFill } from "react-icons/bs";

import { FETCH_POSTS_QUERY } from '../util/graphql';

function DeleteButton({ postId, commentId, callback }) {
    const [ confirmOpen, setConfirmOpen ] = useState(false);

    const handleClose = () => setConfirmOpen(false);

    const handleShow = () => setConfirmOpen(true);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy){
            setConfirmOpen(false);

            if(!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                
                const newData = {
                    getPosts: data.getPosts.filter(p => p.id !== postId),
                  };
                
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data:newData });
            } 
            
            if(callback) callback();
        },
        variables: { 
            postId,
            commentId
        }
    })

    

    return (
        <>
        <Button className='comment-delete' onClick={handleShow}>
            <BsFillTrashFill/>
        </Button>
        <Modal show={confirmOpen} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure ??</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button className='comment-delete' onClick={deletePostOrMutation}>
                Delete Post
            </Button>
            </Modal.Footer>
      </Modal>
      </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`

export default DeleteButton;