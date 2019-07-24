const { Pool } = require('pg');
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = ['%' + cohortName + '%', limit];

const pool = new Pool({
  user: 'VagrantAdmin',
  password: 'sevennine79',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests) as total_assistances
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teacher
LIMIT $2;
`;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(data => {
  console.log(`${data.cohort} : ${data.teacher}`)
})
})
.catch(err => console.error('query error', err.stack));
