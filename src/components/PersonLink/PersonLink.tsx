import React from 'react';
import { Person } from '../../types';

interface PersonLinkProps {
  personName: string | undefined;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  personName,
  people,
}) => {
  const person = people.find(p => p.name === personName);

  return (
    <>
      {person ? (
        <a
          href={`#/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {personName}
        </a>
      ) : !personName || personName.trim() === '' ? (
        '-'
      ) : (
        personName
      )}
    </>
  );
};
