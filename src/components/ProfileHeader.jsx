import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LoadingErrorDisplay } from './LoadingErrorDisplay.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';
import {
  fetchProfileInfo,
  selectProfile,
  updateProfileInfo,
} from '../features/profile.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

/**
 * the ProfileHeader component.
 * Contain logic to fetch the profile info on mounting and to update the profile info.
 * Contain logic to display either loader, error or content.
 * @namespace ProfileHeader
 * @returns {ReactElement} jsx to be injected in the html
 */
export const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputingName, setInputingName] = useState({
    firstName: '',
    lastName: '',
  });
  const dispatch = useDispatch();
  const { firstName, lastName, loading, error } = useSelector(selectProfile);

  /**
   * Launch a fetch action on mounting to load profile info.
   * @function UseEffect
   * @memberof ProfileHeader
   */
  useEffect(() => dispatch(fetchProfileInfo()), [dispatch]);

  /**
   * Close the editing form on each change of firstName or lastName.
   * @function useEffect
   * @memberof ProfileHeader
   */
  useEffect(() => setIsEditing(false), [firstName, lastName]);

  /**
   * Open the form to edit the name.
   * @memberof ProfileHeader
   */
  const handleEditName = () => {
    setInputingName({ firstName: '', lastName: '' });
    setIsEditing(true);
  };

  /**
   * handle each change in the input fields by updating the local state with the new value.
   * @param {object} event - the event object
   * @memberof ProfileHeader
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputingName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * handle the launch of the action to update the name in the db.
   * @param {object} event - the event object
   * @memberof ProfileHeader
   */
  const handleSaveName = (event) => {
    event.preventDefault();
    dispatch(updateProfileInfo(inputingName));
  };

  /**
   * close the editing form.
   * @memberof ProfileHeader
   */
  const handleCancelEditName = () => {
    setIsEditing(false);
  };

  return (
    <ComponentWrapper>
      <Greetings>Welcome back</Greetings>
      {loading === 'pending' ? (
        <LoadingSpinner color="white" size="50px" />
      ) : error === 'fetching error' ? (
        <LoadingErrorDisplay color="white" />
      ) : (
        <>
          {isEditing ? (
            <EditingNameWrapper>
              <InputName
                type="text"
                name="firstName"
                placeholder={firstName}
                value={inputingName.firstName}
                onChange={handleInputChange}
              />
              <InputName
                type="text"
                name="lastName"
                placeholder={lastName}
                value={inputingName.lastName}
                onChange={handleInputChange}
              />
              <EditNameButton type="submit" onClick={handleSaveName}>
                Save
              </EditNameButton>
              <EditNameButton type="button" onClick={handleCancelEditName}>
                Cancel
              </EditNameButton>
              {error === 'updating error' ? (
                <EditNameErrorMessage>
                  Updating has failed, please try again later.
                </EditNameErrorMessage>
              ) : null}
            </EditingNameWrapper>
          ) : (
            <DisplayedNameWrapper>
              <Greetings>
                {firstName} {lastName}
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
 * Styled-tag section for the ProfileHeader ComponentWrapper.
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
 * Styled-tag h2 for the ProfileHeader greetings.
 * @memberof ProfileHeader
 */
const Greetings = styled.h2`
  color: white;
  font-size: 2rem;
`;

/**
 * Styled-tag div for the ProfileHeader Wrapper when displaying name.
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
 * Styled-tag form for the ProfileHeader Wrapper when editing name.
 * @memberof ProfileHeader
 */
const EditingNameWrapper = styled.form`
  display: grid;
  gap: 0.5rem 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1.5rem;
`;

/**
 * Styled-tag input for the ProfileHeader first and last name edition.
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
 * Styled-tag button for the ProfileHeader edit name buttons.
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
 * Styled-tag p for the ProfileHeader edit name error.
 * @memberof ProfileHeader
 */
const EditNameErrorMessage = styled.p`
  font-size: 1rem;
  color: red;
  grid-column: span 2;
  justify-self: center;
`;
