const { Pool } = require('pg');
const args = process.argv.slice(2);

const pool = new Pool({
  user: 'VagrantAdmin',
  password: 'sevennine79',
  host: 'localhost',
  database: 'bootcampx'
});


pool.query(`
SELECT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests) as total_assistances
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${args[0]}%'
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(data => {
  console.log(`${data.cohort} : ${data.teacher}`)
})
})
.catch(err => console.error('query error', err.stack));
