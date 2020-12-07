const Sequelize = require("sequelize");
const { STRING, ENUM, BOOLEAN } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgress://localhost/todo"
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
  const [clean, exercise, sleep] = await Promoise.all([
    Todo.create({ name: "clean" }),
    Todo.create({ name: "exercise" }),
    Todo.create({ name: "sleep" }),
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
