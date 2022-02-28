import styled from 'styled-components';
import bgImage from '../../assets/bank-tree.webp';
import { nanoid } from '@reduxjs/toolkit';

type HeroProps = {
  title: string,
  subtitles: string[],
  text: string
}

export const HomeHero = ({title, subtitles, text}: HeroProps) => {
  return (
    <HeroContainer>
      <HeroContent>
        <h2 className='sr-only'>{title}</h2>
        {subtitles.map(sub => <p className='subtitle' key={nanoid()}>{sub}</p>)}
        <p className='text'>{text}</p>
      </HeroContent>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  background-image: url(${bgImage});
  background-position: 0 -50px;
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  position: relative;
  @media (min-width: 920px) {
    height: 400px;
    background-position: 0 calc(100% / 3);
  }
`;

const HeroContent = styled.div`
  position: relative;
  top: 2rem;
  width: 264px;
  background: white;
  padding: 2rem;
  text-align: left;
  margin: 0 auto;
  
  .subtitle {
    font-weight: 700;
    font-size: 1rem;
  }

  .text {
    font-size: 0.9rem;
    margin-top: 0.7rem;
  }
  
  @media (min-width: 920px) {
    position: absolute;
    top: 50px;
    right: 50px;
    width: 364px;
    margin: 2rem;
    .subtitle {
      font-size: 1.5rem;
    }
    .text {
      font-size: 1.2rem;
      margin-top: 1.2rem;
    }
  }
`;