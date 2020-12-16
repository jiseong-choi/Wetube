import React from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const renderReplyComment = (parentCommentId) => {
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} postId={props.postId} />
                        <ReplyComment  CommentLists={props.CommentLists} />
                    </div>
                }
            </React.Fragment>
        ))
    }

    return (
        <div>
            <p style={{fontSize:'14px',margin:'0',clolor:'gray'}} onClick >
                View 1 more comment(s)
            </p>
            {renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
