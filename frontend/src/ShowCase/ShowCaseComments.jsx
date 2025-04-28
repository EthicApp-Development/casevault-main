import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { getCase } from '../API/cases';
import { Box, Typography, TextField, Button } from '@mui/material';
import AppContext from '../Contexts/AppContext';
import { useCaseContext } from './ShowCase';
import { title_style } from "../Utils/defaultStyles";

function ShowCaseComments() {
    const [comments, setComments] = useState([]);
    const {user} = useContext(AppContext);
    const { caseId } = useParams();
    const [newComment, setNewComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [commentBoxHeight, setCommentBoxHeight] = useState(600);

    useEffect(() => {
            async function fetchCase() {
                if(user) {
                try {
                    const response = await getCase(caseId, user.id);
                    if (response.status === 200) {
                        setComments(response.data.comments || []);
                    } else {
                        console.error('Error al obtener el caso:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error al procesar la solicitud:', error);
                }
            }
            }
            fetchCase();
        }, [caseId]);

    // Handle opening the input field for a new comment
    const handleAddCommentClick = () => {
        setIsEditing(true);
    };

    // Handle canceling the comment input
    const handleCancel = () => {
        setIsEditing(false);
        setNewComment('');
    };

    // Handle submitting the comment
    const handleCommentSubmit = async () => {
        // Reset the input state
        setIsEditing(false);
        setNewComment('');
    }
    useEffect(() => {
        const containerHeight = comments.length > 8 ? 600 : 500; // Adjust based on the number of comments
        setCommentBoxHeight(containerHeight);
      }, [comments]);
    

    return (
    <div
    style={{
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        padding: '20px',
        flexDirection: 'column',
      }}>

<Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '10px' }}>
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
        Add a comment
      </Typography>

      {/* Underline */}
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
        placeholder="Write your comment here..."
        fullWidth
      />

      {/* Buttons for cancel and comment */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        <Button variant="outlined" color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCommentSubmit}>
          Comment
        </Button>
      </Box>
    </Box>
  )}

  {/* Displaying the comments list */}
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
          <p>
            <strong>{comment.user.first_name}</strong>: {comment.body}
          </p>
        </Box>
      ))
    ) : (
      <Typography variant="h6" sx={{ paddingTop: 3 }}>
      </Typography>
    )}
  </Box>
</Box>

    </div>
  );
}

export default ShowCaseComments;