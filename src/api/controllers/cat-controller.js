import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(Number(req.params.id));
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const { cat_name, weight, owner, birthdate } = req.body;
  const filename = req.file.filename;

  const result = addCat({ cat_name, weight, owner, birthdate, filename });
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  res.status(200).json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  res.status(200).json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};
