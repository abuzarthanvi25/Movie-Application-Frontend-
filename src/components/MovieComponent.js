import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  // box-shadow: 0 3px 10px 0 #aaa;
  box-shadow: rgba(251, 251, 251, 0.249) 0px 8px 24px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 5px 15px 0 #e4a843;
    transform: scale(1.1);
  }
`;

const CoverImage = styled.img`
  height: 400px;
  object-fit: cover;
`;

function MovieComponent(props) {
  const { id, poster_path } = props.movie;

  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(id);
        console.log(id);
        window.scrollTo({ top: 600, behavior: "smooth" });
      }}
    >
      <CoverImage src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
    </MovieContainer>
  );
}

export default MovieComponent;
