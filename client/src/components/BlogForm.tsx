import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from '@mui/material';


export interface BlogFormData {
  title: string;
  synopsis: string;
  content: string;   
  imageUrl?: string;
  authorId: string; 
}

interface BlogFormProps {
  initialData?: BlogFormData;
  onSubmit: (data: BlogFormData) => void;
  isSubmitting?: boolean;
}

const BlogForm = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}: BlogFormProps) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    synopsis: '',
    content: '',
    imageUrl: '',
    authorId: '',
  });

  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        {initialData ? 'Edit Blog' : 'Create Blog'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            multiline
            rows={10}
            fullWidth
            required
          
          />

          <TextField
            label="Featured Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            placeholder="https://example.com/image.jpg"
          />

        
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? initialData
                ? 'Updating...'
                : 'Submitting...'
              : initialData
              ? 'Update Blog'
              : 'Create Blog'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BlogForm;
