import React, { useEffect, useState } from 'react';
import "./App.css"
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        'https://api.gyanibooks.com/library/get_dummy_notes'
      );
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="cont">
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card className="card" onClick={() => handleNoteClick(note)}>
                <CardContent className="card-content">
                  <Typography variant="h6" component="h2" className="card-title">
                    {note.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {note.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {selectedNote && (
        <div className="note-overlay">
          <Container maxWidth="md" className="note-container">
            <Typography variant="h6" component="h2" className="note-title">
              {selectedNote.title}
            </Typography>
            <Typography variant="body2" component="p" className="note-content">
              {selectedNote.notes}
            </Typography>
            <button className="note-close-button" onClick={() => setSelectedNote(null)}>
              Close
            </button>
          </Container>
        </div>
      )}
    </div>
  );
}

export default App;
