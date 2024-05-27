import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardActions, Button, IconButton, InputLabel } from '@mui/material';
import { AddAPhoto, Delete } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { Stack } from 'react-bootstrap';

const MAX_IMAGES = 6;

const PictureGrid = ({ onImagesChange, photoList }) => {
  const [images, setImages] = useState(photoList);

  const handleDrop = acceptedFiles => {
    // Add dropped files to images array, up to max of 6
    const newImages = [...images, ...acceptedFiles].slice(0, MAX_IMAGES);
    onImagesChange(newImages)
    setImages(newImages);
  };

  const handleRemove = index => {
    // Remove image at specified index
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages)
    setImages(newImages);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <Stack container gap={3} direction='column'>
      <InputLabel>Fotografii: {images.length}/{MAX_IMAGES}</InputLabel>

      <Grid container spacing={2}>
        {images.length < MAX_IMAGES && (
          <Grid item xs={12} sm={6} md={4} {...getRootProps()}>
            <Card>
              <input {...getInputProps()} accept="image/*" multiple />
              <CardActions sx={{ width: "100%", height: "180px" }}>
                <Button startIcon={<AddAPhoto color='#4B86B4' />} fullWidth style={{
                  borderColor: "#4B86B4",
                  color: "#4B86B4",
                  padding: "10px 20px",
                  fontSize: "18px",
                  fontFamily: "Montserrat",
                  fontWeight: "600",
                  cursor: 'pointer',
                  textTransform: "none"
                }}>
                  Alegeți o fotografie sau trageți-o aici
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                sx={{ width: "100%", height: "180px", objectFit: "cover" }}
                component="img"
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
              />
              <CardActions>
                <IconButton onClick={() => handleRemove(index)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default PictureGrid;