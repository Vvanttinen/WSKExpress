import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat, removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (err) {
    console.error('Get cats failed:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) {
      res.json(cat);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error('Get cat by ID failed:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
};

const postCat = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const { cat_name, weight, owner, birthdate } = req.body;
  const filename = req.file.filename;

  try {
    const result = await addCat({ cat_name, weight, owner, filename, birthdate });

    if (result.cat_id) {
      res.status(201);
      res.json({message: 'New cat added.', result});
    } else {
      res.sendStatus(400);
    }
  }
  catch (err) {
    console.error('Add cat failed:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
};

const putCat = async (req, res) => {
  try {
    const result = await modifyCat(req.body, req.params.id);

    if (!result) {
      res.status(400).json({message: 'Cat item not updated.'});
      return;
    }

    res.status(200).json({message: 'Cat item updated.'});
  } catch (err) {
    console.error('Update cat failed:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
};

const deleteCat = async (req, res) => {
  try {
    const result = await removeCat(req.params.id);

    if (!result || result.success === false) {
      return res.status(400).json({message: 'Cat item not deleted.'});
    }

    res.status(200).json({message: 'Cat item deleted.'});
  } catch (err) {
    console.error('Delete cat failed:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};
