import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import {Input} from 'antd'
const { TextArea } = Input;

function Comment(props) {

    const postId = props.postId

    const user = useSelector(state => state.user)
    const [commentValue,setcommentValue] = useState("")

    const handleClick = (e) => {
        setcommentValue(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.postId,

        }
        
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                    setcommentValue("")
                    props.refreshFunction(response.data.result)
                } else
                    alert('댓글 등록을 실패하였습니다.')
        })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr /> 

            {/* Comment Lists */}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} postId={postId} />
                        <ReplyComment parentCommentId={comment._id} refreshFunction={props.refreshFunction} CommentLists={props.CommentLists} postId={postId} />
                    </React.Fragment>
                )                
            ))}

            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder='댓글을 작성해 주세요'
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment
