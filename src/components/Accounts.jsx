import { useEffect } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { toUsCurrency } from '../utils/processes/toUsCurrency.js';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';
import { LoadingErrorDisplay } from './LoadingErrorDisplay.jsx';
import { fetchAccounts, selectAccounts } from '../features/accounts.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const Accounts = () => {
  const dispatch = useDispatch();
  const { loading, error, setOfAccounts } = useSelector(selectAccounts);
  useEffect(() => dispatch(fetchAccounts()), [dispatch]);

  return (
    <ComponentWrapper>
      <h2 className="sr-only">List of accounts</h2>
      {loading === 'pending' ? (
        <LoadingSpinner color="white" size="150px" />
      ) : error === 'fetching error' ? (
        <LoadingErrorDisplay color="white" />
      ) : (
        setOfAccounts.map((account, index) => (
          <Account key={index}>
            <AccountTitle>{account.title}</AccountTitle>
            <AccountAmount>{toUsCurrency(account.amount)}</AccountAmount>
            <AccountAmountDescription>
              {account.amountDescription}
            </AccountAmountDescription>
            <ViewTransactionButton>View transactions</ViewTransactionButton>
          </Account>
        ))
      )}
    </ComponentWrapper>
  );
};

/**
 * Styled-tag section for the Accounts ComponentWrapper
 * @memberof Accounts
 */
const ComponentWrapper = styled.section`
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
