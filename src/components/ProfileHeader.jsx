import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { LoadingErrorDisplay } from './LoadingErrorDisplay.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { UserDataContext } from '../utils/contexts/UserDataContext.js';
import { apiRequest } from '../utils/services/apiRequest.js';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';

export const ProfileHeader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isUpdatingError, setIsUpdatingError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputingName, setInputingName] = useState({
    firstName: '',
    lastName: '',
  });
  const { userData, updateUserData } = useContext(UserDataContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const dataRequest = await apiRequest({
        type: 'post',
        endPoint: '/user/profile',
        token: userData.token,
      });
      if (dataRequest.rejected) setIsLoadingError(true);
      else
        updateUserData({
          firstName: dataRequest.resolved.data.body.firstName,
          lastName: dataRequest.resolved.data.body.lastName,
        });
      setIsLoading(false);
    })();
  }, [updateUserData, userData.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputingName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditName = () => {
    setIsUpdatingError(false);
    setIsEditing(true);
  };

  const handleSaveName = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateRequest = await apiRequest({
      type: 'put',
      endPoint: '/user/profile',
      token: userData.token,
      body: {
        firstName: inputingName.firstName,
        lastName: inputingName.lastName,
      },
    });
    if (updateRequest.rejected) {
      setIsUpdatingError(true);
      setIsLoading(false);
    } else {
      updateUserData({
        firstName: updateRequest.resolved.data.body.firstName,
        lastName: updateRequest.resolved.data.body.lastName,
      });
      setInputingName({ firstName: '', lastName: '' });
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  const handleCancelEditName = () => {
    setInputingName({ firstName: '', lastName: '' });
    setIsEditing(false);
  };

  return (
    <ComponentWrapper>
      <Greetings>Welcome back</Greetings>
      {isLoading ? (
        <LoadingSpinner color="white" size="50px" />
      ) : isLoadingError ? (
        <LoadingErrorDisplay color="white" />
      ) : (
        <>
          {isEditing ? (
            <EditingNameWrapper>
              <InputName
                type="text"
                name="firstName"
                placeholder={userData.firstName}
                value={inputingName.firstName}
                onChange={handleInputChange}
              />
              <InputName
                type="text"
                name="lastName"
                placeholder={userData.lastName}
                value={inputingName.lastName}
                onChange={handleInputChange}
              />
              <EditNameButton type="submit" onClick={handleSaveName}>
                Save
              </EditNameButton>
              <EditNameButton type="button" onClick={handleCancelEditName}>
                Cancel
              </EditNameButton>
              {isUpdatingError ? (
                <EditNameErrorMessage>
                  Updating has failed, please try again later.
                </EditNameErrorMessage>
              ) : null}
            </EditingNameWrapper>
          ) : (
            <DisplayedNameWrapper>
              <Greetings>
                {userData.firstName} {userData.lastName}
              </Greetings>
              <EditNameButton type="button" onClick={handleEditName}>
                Edit
              </EditNameButton>
            </DisplayedNameWrapper>
          )}
        </>
      )}
    </ComponentWrapper>
  );
};

/**
 * Styled-tag section for the ProfileHeader ComponentWrapper
 * @memberof ProfileHeader
 */
const ComponentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 1.5rem;
`;

/**
 * Styled-tag h2 for the ProfileHeader greetings
 * @memberof ProfileHeader
 */
const Greetings = styled.h2`
  color: white;
  font-size: 2rem;
`;

/**
 * Styled-tag div for the ProfileHeader Wrapper when displaying name
 * @memberof ProfileHeader
 */
const DisplayedNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

/**
 * Styled-tag form for the ProfileHeader Wrapper when editing name
 * @memberof ProfileHeader
 */
const EditingNameWrapper = styled.form`
  display: grid;
  gap: 0.5rem 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1.5rem;

  @media only screen and (min-width: 45rem) {
  }
`;

/**
 * Styled-tag input for the ProfileHeader first and last name edition
 * @memberof ProfileHeader
 */
const InputName = styled.input`
  background: white;
  padding: 0.25rem;
  font-size: 1.2rem;
  grid-column: span 2;
  width: 100%;

  @media only screen and (min-width: 45rem) {
    grid-column: span 1;
    width: 17.5rem;
  }
`;

/**
 * Styled-tag button for the ProfileHeader edit name buttons
 * @memberof ProfileHeader
 */
const EditNameButton = styled.button`
  ${mainButtonStyle}

  font-size: 1rem;
  font-weight: 400;
  width: 10rem;
  margin-top: 0;

  @media only screen and (min-width: 45rem) {
    width: 8rem;

    &:nth-of-type(2n + 1) {
      justify-self: right;
    }

    &:nth-of-type(2n) {
      justify-self: left;
    }
  }
`;

/**
 * Styled-tag p for the ProfileHeader edit name error
 * @memberof ProfileHeader
 */
const EditNameErrorMessage = styled.p`
  font-size: 1rem;
  color: red;
  grid-column: span 2;
  justify-self: center;
`;
