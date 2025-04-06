import {listAllUsers, findUserById, addUser, modifyUser, removeUser} from '../models/user-model.js';

const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Get users failed:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error('Get user by ID failed:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
};

const postUser = async (req, res) => {
  try {
    const result = await addUser(req.body);

    if (result.user_id) {
      res.status(201);
      res.json({message: 'New user added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error('Add user failed:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
};
const putUser = async (req, res) => {
  try {
    const result = await modifyUser(req.body, req.params.id);

    if (!result) {
      res.status(400).json({message: 'User item not updated.'});
      return;
    }

    res.status(200).json({message: 'User item updated.'});
  } catch (err) {
    console.error('Update user failed:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await removeUser(req.params.id);

    if (!result || result.success === false) {
      return res.status(400).json({ message: 'User item not deleted.' });
    }

    res.status(200).json({ message: 'User item deleted.' });
  } catch (err) {
    console.error('Delete user failed:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
