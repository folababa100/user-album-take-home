import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PhotoProps {
  photos: { id: number; thumbnailUrl: string; title: string }[];
}

const Photos: React.FC<PhotoProps> = ({ photos }) => {
  return (
    <div>
      <h3>Photos</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ width: '150px' }}>
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ width: '100%' }}
            />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface Album {
  id: number;
  title: string;
}

interface AlbumsProps {
  albums: Album[];
}

const Albums: React.FC<AlbumsProps> = ({ albums }) => {
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      if (selectedAlbumId) {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}&_limit=5`,
          );
          setPhotos(response.data);
        } catch (error) {
          console.error('Error fetching photos:', error);
        }
      }
    })();
  }, [selectedAlbumId]);

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map(({ id, title }) => (
          <li key={id} onClick={() => setSelectedAlbumId(id)}>
            {title}
            {selectedAlbumId === id && <Photos photos={photos} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
