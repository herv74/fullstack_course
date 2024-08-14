const CourseManagement = ({ course }) => {
  const parts = course.parts;

  return (
    <div>
      <h2>{course.name}</h2>
      <div>
        {parts.map((part) => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}

        <p>
          <strong>
            total of {parts.reduce((total, part) => total + part.exercises, 0)}{" "}
            exercises
          </strong>
        </p>
      </div>
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <CourseManagement key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Course;
