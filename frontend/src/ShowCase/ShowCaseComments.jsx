import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { getCase, addCommentToCase, postVotesInComments } from '../API/cases';
import { Box, Typography, TextField, Button } from '@mui/material';
import { ThumbUp, ThumbUpOffAlt, ThumbDown, ThumbDownOffAlt } from '@mui/icons-material';
import AppContext from '../Contexts/AppContext';
import { useCaseContext } from "./ShowCase";
import { title_style } from '../Utils/defaultStyles';

function ShowCaseComments() {
    const {comments, setComments} = useCaseContext();
    const {user} = useContext(AppContext);
    const { caseId } = useParams();
    const [newComment, setNewComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [commentBoxHeight, setCommentBoxHeight] = useState(600);
    const {canComment, setCanComment} = useCaseContext();
    const {allowComments, setAllowComments} = useCaseContext();
        
    const handleAddCommentClick = () => {
        setIsEditing(true);
    };
    const handleCancel = () => {
        setIsEditing(false);
        setNewComment('');
    };

    const handleCommentSubmit = async () => {
      if (!newComment.trim()) return;

      try {
        const response = await addCommentToCase(caseId, newComment);

        if (response.status === 201) {
          const createdComment = response.data;

          setComments(prev => [...prev, createdComment]);
          setIsEditing(false);
          setNewComment('');
          setCanComment(false);
        } else {
          console.error('Error al crear el comentario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al enviar el comentario:', error);
      }
    }
    useEffect(() => {
        const containerHeight = comments.length > 8 ? 600 : 500; // Adjust based on the number of comments
        setCommentBoxHeight(containerHeight);
      }, [comments]);

    const handleUpvote = async (commentID) => {
      try{
        const voteValue = 1;
        const response = await postVotesInComments(caseId, commentID, voteValue);
        if (response.status === 200) {
          const voteUpdated = response.data;
          setComments(prevComments => 
            prevComments.map(comment => comment.id === voteUpdated.vote.comment_id ? { ...comment, 
              upvotes_count: voteUpdated.upvotes_count, 
              downvotes_count: voteUpdated.downvotes_count, 
              user_vote: voteUpdated.user_vote} : comment)
          );
        }
      } catch (error) {
        console.error('Error al votar', error);
      }
    }

    const handleDownVote = async (commentID) => {
      try{
        const voteValue = -1;
        const response = await postVotesInComments(caseId, commentID, voteValue);
        if (response.status === 200) {
          const voteUpdated = response.data;
          setComments(prevComments => 
            prevComments.map(comment => comment.id === voteUpdated.vote.comment_id ? { ...comment, 
              upvotes_count: voteUpdated.upvotes_count, 
              downvotes_count: voteUpdated.downvotes_count, 
              user_vote: voteUpdated.user_vote} : comment)
          );
        }
      } catch (error) {
        console.error('Error al votar', error);
      }
    }

    return (
    <div
    style={{
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        padding: '20px',
        flexDirection: 'column',
      }}>
    {allowComments ? (
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '10px' }}>
        {canComment && (
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '10px' }}>
            {/* Comment text zone with underline */}
            {!isEditing && (
              <Box sx={{ position: 'relative', width: '100%' }}>
                <Typography
                  variant="body1"
                  sx={{
                    cursor: 'pointer',
                    color: 'gray',
                    marginBottom: '10px',
                    display: 'inline-block',
                    paddingBottom: '5px',
                    width: '100%',
                  }}
                  onClick={handleAddCommentClick}
                >
                  Agregar un comentario
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'gray',
                  }}
                />
              </Box>
            )}

            {/* Input field for new comment */}
            {isEditing && (
              <Box sx={{ width: '100%', marginBottom: '20px' }}>
                <TextField
                  variant="outlined"
                  multiline
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe tu comentario..."
                  fullWidth
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    marginTop: '10px',
                  }}
                >
                  <Button variant="outlined" color="error" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button variant="contained" onClick={handleCommentSubmit}>
                    Comentar
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
        

        {/* Comments list*/}
        <Box
        sx={{
          height: commentBoxHeight,
          overflowY: 'auto',
          marginTop: '10px',
          paddingRight: '10px',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        >
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                backgroundColor: 'white',
                padding: 2,
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: 3,
                width: '100%',
              }}
            >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">
                {comment.user.first_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.created_at).toLocaleString()}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ marginTop: 1 }}>
              {comment.body}
            </Typography>

            <Box sx={{ marginTop: 1 }}>
              <Button 
                size="small" 
                variant="text"
                onClick={() => handleUpvote(comment.id)}
                startIcon={comment.user_vote === 1 ? <ThumbUp /> : <ThumbUpOffAlt  />}>
                {comment.upvotes_count > 0 ? comment.upvotes_count : ''}
              </Button>
              <Button 
                size="small" 
                variant="text"
                onClick={() => handleDownVote(comment.id)}
                startIcon={comment.user_vote === -1 ? <ThumbDown /> : <ThumbDownOffAlt  />}>
                {comment.downvotes_count > 0 ? comment.downvotes_count : ''}
              </Button>
            </Box>
          </Box>
          ))
        ) : (
        <Typography variant="h2" sx={title_style}>
          Nadie ha comentado aún.
        </Typography>
        )}
        </Box>
      </Box> ) : (
        <Typography variant='h2' sx={title_style}>
          Los comentarios están deshabilitados para este caso.
        </Typography>
      )}
  </div>
  );
}

export default ShowCaseComments;