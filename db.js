const Sequelize = require("sequelize");
const { STRING, ENUM, BOOLEAN } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgresql://localhost/todo"
);

//Setting up our data model
//1st arg is a string that labels the table, 2nd arg is an object
const Todo = conn.define("todo", {
  name: { type: STRING },
  priority: { type: ENUM("Low", "Medium", "High") },
  completed: {
    type: BOOLEAN,
    defaultValue: false,
  },
  description: { type: STRING },
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [clean, exercise, sleep] = await Promise.all([
    Todo.create({ name: "clean", priority: "Low" }),
    Todo.create({ name: "exercise", priority: "Medium" }),
    Todo.create({ name: "sleep", priority: "High" }),
  ]);
};
//Columns to include in the database table
//name
//completed
//priority
//description
const init = async () => {
  try {
    await conn.authenticate();
    syncAndSeed();
  } catch (err) {
    console.log(err);
  }
};
init();
module.exports = { init, Todo };
