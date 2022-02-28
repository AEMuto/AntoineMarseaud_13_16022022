import { StyledMain } from './container/StyledMain';
import { HomeHero } from '../components/Home/HomeHero';
import { HomeFeatures } from '../components/Home/HomeFeatures';
import chatIcon from '../assets/icon-chat.svg'
import moneyIcon from '../assets/icon-money.svg'
import securityIcon from '../assets/icon-security.svg'

const heroContent = {
  title: 'Promoted Content',
  subtitles: ['No fees.', 'No minimum deposit.', 'High interest rates.'],
  text: 'Open a savings account with Argent Bank today!',
};

const featuresContent = [
  {
    icon: chatIcon,
    title: 'You are our #1 priority',
    text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
  },
  {
    icon: moneyIcon,
    title: 'More savings means higher rates',
    text: 'The more you save with us, the higher your interest rate will be!',
  },
  {
    icon: securityIcon,
    title: 'Security you can trust',
    text: 'We use top of the line encryption to make sure your data and money is always safe.',
  },
];

export const Home = () => {
  return (
    <StyledMain>
      <HomeHero {...heroContent} />
      <HomeFeatures content={featuresContent} />
    </StyledMain>
  );
};
