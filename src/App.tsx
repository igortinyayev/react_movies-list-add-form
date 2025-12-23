// src/components/NewMovie.tsx

import { useState } from 'react';
import { TextField } from './components/TextField/TextField'; // Перевір шлях, якщо потрібно
import { Movie } from './types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // Для повного скидання помилок у TextField після успішного додавання
  const [formKey, setFormKey] = useState(0);

  // Перевіряємо, чи всі обов’язкові поля заповнені (з trim)
  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки!

    if (!isFormValid) {
      return;
    }

    const newMovie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);

    // Очищаємо поля
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    // Скидаємо помилки, перемонтувавши форму (змінюємо key)
    setFormKey(prev => prev + 1);
  };

  return (
    <form
      key={formKey} // Ключ для реініціалізації TextField та скидання помилок
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="NewMovie__title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        // description не required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <button
        type="submit"
        className="button"
        disabled={!isFormValid} // Активна тільки коли всі required поля заповнені
      >
        Add movie
      </button>
    </form>
  );
};
