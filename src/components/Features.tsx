import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';
import { colors } from '../theme/colors';

type FeaturesProp = { content: FeatureProp[] }

type FeatureProp = {
  icon: string,
  title: string,
  text: string
}

export const Features = ({ content }: FeaturesProp) => {
  return (
    <FeaturesContainer>
      <h2 className='sr-only'>Features</h2>
      {content.map(item => <Feature {...item} key={nanoid()} />)}
    </FeaturesContainer>
  );
};

const Feature = ({ icon, title, text }: FeatureProp) => {
  return (
    <FeatureWrapper>
      <div className='icon-wrapper'><img src={icon} alt='' /></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </FeatureWrapper>
  );
};

const FeaturesContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  @media (min-width: 920px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
  }
`;
const FeatureWrapper = styled.div`
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 400px;
  h3 {
    color: ${colors.title}
    font-size: 1.25rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  .icon-wrapper {
    width: 152px;
    height: 152px;
    padding: 1rem;
    border: 10px solid ${colors.primary};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 4rem;
    height: 4rem;
  }
`;