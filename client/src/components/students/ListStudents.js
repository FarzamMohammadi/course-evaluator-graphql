import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getStudents } from '../../actions/students';
import './students.css';

export default function ListStudents() {
  const [students, setStudents] = useState([]);
  const [executed, setExecuted] = useState(false);

  async function getStudentsToShow() {
    const getAttendeesPromise = await getStudents().then(function (
      studentsList
    ) {
      if (studentsList && !executed) {
        setStudents(studentsList);
        setExecuted(true);
      }
    });
  }

  function renderTableData() {
    getStudentsToShow();
    return students?.map((student, index) => {
      const { _id, studentNumber, email } = student;
      return (
        <tr key={_id}>
          <td>{studentNumber}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }

  return (
    <Fragment>
      <section className='container'>
        <div>
          <h1 id='title'>All Registered Students:</h1>
          <Link to='/list-courses'>
            <button type='button'>Go Back</button>
          </Link>
          <table id='attendees'>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
}
