import { Person } from '../../types/Person';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  function loadPeople() {
    setLoading(true);
    setErrorMessage('');
    setIsErrorVisible(false);
    getPeople()
      .then(data => {
        setPeople(data);

        if (data.length === 0) {
          setErrorMessage('There are no people on the server');
          setIsErrorVisible(true);
          setTimeout(() => setIsErrorVisible(false), 4000);
        }
      })
      .catch(() => {
        setLoading(true);
        setErrorMessage('Something went wrong');
        setIsErrorVisible(true);
        setTimeout(() => setIsErrorVisible(false), 4000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadPeople, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {people.length > 0 && !loading && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map((person: Person) => (
              <tr
                data-cy="person"
                key={person.slug}
                className={
                  selectedSlug?.trim() === person.slug.trim()
                    ? 'has-background-warning'
                    : ''
                }
                onClick={() => setSelectedSlug(person.slug.trim())}
              >
                <td>
                  <a
                    href={`#/people/${person.slug}`}
                    className={person.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {person.name}
                  </a>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  <PersonLink personName={person.motherName} people={people} />
                </td>
                <td>
                  <PersonLink personName={person.fatherName} people={people} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {!loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isErrorVisible && <p data-cy="noPeopleMessage">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};
