import React,{useState} from 'react'
import {Comment,Avatar,Button,Input} from 'antd'

const { TextArea } = Input;

function SingleComment() {

    const [OpenRelpy, setOpenReply] = useState(false)
    const [CommentValue,setCommentValue] = useState('')
    
    const onClickReplyOpen = () => {
        setOpenReply(!OpenRelpy)
    }

    const actions = [
        <span onClick={onClickReplyOpen} key='comment-basic-reply-to'>Reply to</span>
    ]

    const onHandleChange = (e) => {
        setCommentValue(e.target.CommentValue)
    }

    return (
        <div>
            <Comment
                actions={actions}
                author
                avatar={<Avatar src alt />}
                content
            />
            {OpenRelpy &&
            <form style={{ display: 'flex' }} onSubmit >
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder='댓글을 작성해 주세요'
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick >Submit</button>
                </form>   
            }
        </div>
    )
}

export default SingleComment
