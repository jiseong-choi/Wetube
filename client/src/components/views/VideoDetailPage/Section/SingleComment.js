import React,{useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import Axios from 'axios'
import {useSelector} from 'react-redux'

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user)

    const [OpenRelpy, setOpenReply] = useState(false)
    const [CommentValue,setCommentValue] = useState('')
    
    const onClickReplyOpen = () => {
        setOpenReply(!OpenRelpy)
    }

    const actions = [
        <span onClick={onClickReplyOpen} key='comment-basic-reply-to'>Reply to</span>
    ]

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo:props.comment._id
        }
        
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                } else
                    alert('댓글 등록을 실패하였습니다.')
        })
    }

    console.log(props)

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt='image' />}
                content={<p>{ props.comment.content }</p>}
            />
            {OpenRelpy &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder='댓글을 작성해 주세요'
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
                </form>   
            }
        </div>
    )
}

export default SingleComment
