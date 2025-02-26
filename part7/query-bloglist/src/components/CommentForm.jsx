import { useState } from 'react'
import {Button, ButtonGroup} from "@heroui/button";

const CommentForm = ({ id, addComment }) => {
  const [comment, setComment] = useState('')

  const handleComment = (event) => {
    event.preventDefault()
    if (comment.trim() === '') return
    addComment(id, comment)
    setComment('')
  }

  return (
    <div>
      <form onSubmit={handleComment}>
        <input
          placeholder="type to add comment"
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button color="primary" type="submit" disabled={comment.trim() === ''}>
          add comment
        </Button>
      </form>
    </div>
  )
}

export default CommentForm
