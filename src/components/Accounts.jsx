import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserDataContext } from '../utils/contexts/UserDataContext.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { ACCOUNTS_DATA } from '../data/ACCOUNTS_DATA.js';
import { toUsCurrency } from '../utils/processes/toUsCurrency.js';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';
import { LoadingErrorDisplay } from './LoadingErrorDisplay.jsx';

export const Accounts = () => {
  const { userData, updateUserData } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserAccount = async () => {
      setIsLoading(true);
      try {
        const accountsData = await new Promise((resolve) => {
          setTimeout(() => resolve(ACCOUNTS_DATA), 2000);
        });
        updateUserData({ accountsData: accountsData });
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAccount();
  }, [updateUserData]);

  return (
    <Container>
      <h2 className="sr-only">List of accounts</h2>
      {isLoading ? (
        <LoadingSpinner color="white" size="150px" />
      ) : isError ? (
        <LoadingErrorDisplay color="white" />
      ) : (
        userData.accountsData.map((accountData, index) => (
          <Account key={index}>
            <AccountTitle>{accountData.title}</AccountTitle>
            <AccountAmount>{toUsCurrency(accountData.amount)}</AccountAmount>
            <AccountAmountDescription>
              {accountData.amountDescription}
            </AccountAmountDescription>
            <ViewTransactionButton>View transactions</ViewTransactionButton>
          </Account>
        ))
      )}
    </Container>
  );
};

/**
 * Styled-tag section for the Accounts container
 * @memberof Accounts
 */
const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

/**
 * Styled-tag article for the Account item
 * @memberof Accounts
 */
const Account = styled.article`
  display: grid;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: white;
  width: 80%;
  padding: 1.5rem;
  text-align: left;
  margin-bottom: 2rem;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: auto;
  grid-template-areas:
    'title'
    'amount'
    'description'
    'transaction';

  @media only screen and (min-width: 45rem) {
    grid-template-rows: repeat(3, auto);
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'title transaction'
      'amount transaction'
      'description transaction';
  }
`;

/**
 * Styled-tag h3 for the Account title
 * @memberof Accounts
 */
const AccountTitle = styled.h3`
  grid-area: title;
  font-size: 1rem;
  font-weight: normal;
`;

/**
 * Styled-tag p for the Account amount
 * @memberof Accounts
 */
const AccountAmount = styled.p`
  grid-area: amount;
  font-size: 2.5rem;
  font-weight: bold;
`;

/**
 * Styled-tag p for the Account amount description
 * @memberof Accounts
 */
const AccountAmountDescription = styled.p`
  grid-area: description;
  font-size: 1rem;
  font-weight: normal;
`;

/**
 * Styled-tag button for the Account view transaction button
 * @memberof Accounts
 */
const ViewTransactionButton = styled.button`
  ${mainButtonStyle}

  grid-area: transaction;
  width: 100%;

  @media only screen and (min-width: 45rem) {
    width: 12.5rem;
    margin-top: 0;
  }
`;
