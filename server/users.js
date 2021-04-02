const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    //checking if same user is trying to come in same room
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return {
      error: "Username is taken",
    };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removerUser = (id) => {
  const index = users.findIndex((user) => user.id === id); //check if user with that id exists

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  //remove user from array
};

const getUser = (id) => users.find((user) => user.id === id);
//check if user id exists for our convinience

const getUserInRoom = (room) => users.filter((user) => user.room === room);
//check if room id exists for our convinience

module.exports = { addUser, removerUser, getUser, getUserInRoom };
