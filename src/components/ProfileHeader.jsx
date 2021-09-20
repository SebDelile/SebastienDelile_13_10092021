import { useState } from 'react';
import styled from 'styled-components';
import { mainButtonStyle } from '../utils/style/mainButtonStyle.js';

export const ProfileHeader = ({ firstname, lastname }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputingName, setInputingName] = useState({
    firstname: '',
    lastname: '',
  });
  const [actualName, setActualName] = useState({
    firstname: firstname,
    lastname: lastname,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputingName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleSaveButton = (e) => {
    e.preventDefault();
    setActualName({
      firstname: inputingName.firstname,
      lastname: inputingName.lastname,
    });
    setInputingName({ firstname: '', lastname: '' });
    setIsEditing(false);
  };

  const handleCancelButton = () => {
    setInputingName({ firstname: '', lastname: '' });
    setIsEditing(false);
  };

  return (
    <Container>
      <Greetings>Welcome back</Greetings>
      {isEditing ? (
        <EditingNameWrapper>
          <InputName
            type="text"
            name="firstname"
            placeholder={actualName.firstname}
            value={inputingName.firstName}
            onChange={handleInputChange}
          />
          <InputName
            type="text"
            name="lastname"
            placeholder={actualName.lastname}
            value={inputingName.lastName}
            onChange={handleInputChange}
          />
          <EditNameButton type="submit" onClick={handleSaveButton}>
            Save
          </EditNameButton>
          <EditNameButton type="button" onClick={handleCancelButton}>
            Cancel
          </EditNameButton>
        </EditingNameWrapper>
      ) : (
        <DisplayNameWrapper>
          <Greetings>
            {actualName.firstname} {actualName.lastname}
          </Greetings>
          <EditNameButton type="button" onClick={handleEditButton}>
            Edit
          </EditNameButton>
        </DisplayNameWrapper>
      )}
    </Container>
  );
};

/**
 * Styled-tag section for the ProfileHeader container
 * @memberof ProfileHeader
 */
const Container = styled.section`
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
const DisplayNameWrapper = styled.div`
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
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1.5rem;

  @media only screen and (min-width: 45rem) {
    grid-template-rows: repeat(2, auto);
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
