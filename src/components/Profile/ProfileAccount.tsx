import Button from '../Button';
import styled from 'styled-components';
import { colors } from '../../theme/colors';

type AccountData = {
  data: {
    title: string;
    amount: string;
    description: string;
  };
};

const ProfileAccount = ({ data }: AccountData) => {
  const { title, amount, description } = data;
  return (
    <Account>
      <Content>
        <h3 className="title">{title}</h3>
        <p className="amount">{amount}</p>
        <p className="description">{description}</p>
      </Content>

      <Button style={{ padding: '.5rem', fontSize: '1.1rem' }}>
        View transactions
      </Button>
    </Account>
  );
};

export default ProfileAccount;

const Account = styled.section`
  width: 80%;
  max-width: 50rem;
  margin: 0 auto 2rem auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${colors.white};
  border: 1px solid ${colors.black};
  button {
    width: 100%;
    margin-top: 1rem;
  }
  @media (min-width: 720px) {
    flex-direction: row;
    button {
      width: 200px;
      align-self: center;
      margin-top: 0;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  color: ${colors.text};
  h3.title {
    font-size: 1rem;
    font-weight: 400;
  }
  p.amount {
    font-size: 2.5rem;
    font-weight: 700;
  }
  p.description {
  }
`;
