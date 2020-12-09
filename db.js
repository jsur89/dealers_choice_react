const Sequelize = require("sequelize");
const { STRING, ENUM, BOOLEAN } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgresql://localhost/todo"
);

//DATA MODEL SET UP
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
//==================================
//SYNC & SEED
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [clean, exercise, sleep] = await Promise.all([
    Todo.create({
      name: "clean",
      priority: "Low",
      description: "Clean bedroom",
    }),
    Todo.create({
      name: "exercise",
      priority: "Medium",
      description: "Run 3 miles",
    }),
    Todo.create({
      name: "sleep",
      priority: "High",
      description: "Sleep 7 hours",
    }),
  ]);
};
//==================================
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
