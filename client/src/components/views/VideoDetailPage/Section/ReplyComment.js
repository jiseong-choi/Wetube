import React,{useEffect,useState} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {
        let commentNumber = 0;

        props.CommentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists])

    let renderReplyComment = (parentCommentId) => {
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{width:'80px',marginLeft:'40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} postId={props.postId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} CommentLists={props.CommentLists} postId={props.postId} />
                    </div>
                }
            </React.Fragment>
        ))
    }

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
        console.log(OpenReplyComments
        )
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{fontSize:'14px',margin:'0',color:'gray'}} onClick={onHandleChange} >
                View {ChildCommentNumber} more comment(s)
                </p>   
            }
            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
