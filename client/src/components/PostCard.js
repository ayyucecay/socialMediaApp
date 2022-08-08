import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsFillChatDotsFill, BsFillTrashFill } from "react-icons/bs";
import moment from 'moment';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import { AuthContext } from '../context/auth';
import '../style/PostCard.css';

function PostCard({ 
        post: { body, createdAt, id, username, likeCount, commentCount, likes} 
    }) {
        const { user } = useContext(AuthContext);

    return (
        <Card style={{ width: '18rem'}}>
        <Card.Body>
            <Row>
                <Col>
                    <Card.Title>{username}</Card.Title>
                    <Card.Subtitle as={Link} to={`/posts/${id}`} className="mb-2 text-muted">{moment(createdAt).fromNow(true)}</Card.Subtitle>
                </Col>
                <Col>
                    <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1824452bb61%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1824452bb61%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.1328125%22%20y%3D%2296.6%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                </Col>
            </Row>
            <Card.Text>{body}</Card.Text>
        </Card.Body>
        <Card.Body>
        <Row>
            <LikeButton user={user} post={{ id, likes, likeCount }}/> 
            <Col className='col-5'>
                <div className="button-comment">
                    <Row style={{padding: "0px"}}>
                        
                        <Col className='col-6'>
                           
                            <Button className='comment-button' as={Link} to={`/posts/${id}`}>
                                <BsFillChatDotsFill/>
                            </Button>
                               
                        </Col>
                        <Col className='col-6 comment-p'>
                                {commentCount}
                        </Col>
                    </Row>
                </div>    
            </Col>   
            <Col className='col-2' style={{marginLeft: "-10px"}}>
                {user && user.username === username && <DeleteButton postId={id}/>}
            </Col>
        </Row> 
        </Card.Body>
    </Card>
    )


}

export default PostCard;