//All function of Book for Crud 

const {Book} = require('../models/book');

exports.create_book = (req, res) =>{
  
  let book = new Book({...req.body});
  book.save().then((doc)=>{
    res.status(200).send("create successfully");
  },(error)=> {
      res.status(400).send(error);
  });
}

exports.get_books = (req, res) =>{

  Book.find({})
    .then(books =>{
      res.status(200).send(books)})
    .catch(error => res.status(404).json({ error }));
}

exports.get_book = (req, res) =>{

  const id = req.params.id;
  Book.findOne({ _id: id})
    .then(book =>{
      res.status(200).send(book)})
    .catch(error => res.status(404).json({ error }));
}

exports.update_book = (req, res) =>{

  const id = req.params.id;
  const body = req.body;
  Book.updateOne({ _id: id}, {...body})
      .then(() =>{
        res.status(200).send("update successfully")})
      .catch(error => res.status(400).json({ error }));
}

exports.delete_book = (req, res) =>{
  
  const id = req.params.id;
  Book.deleteOne({ _id: id})
    .then(()=>{
      res.status(200).send("delete successfully")})
    .catch(error => res.status(400).json({ error }));
}

exports.filter_book = (req, res) =>{
  
  const body = req.body;

  let query = {
    '$and': []
  };

  let yearQuery = [];

  if(body.year_low  && body.year_high  && body.year_publication ) 
  {
      yearQuery.push({ 'year_publication': { $gte: body.year_low, $lte: body.year_high } });
      yearQuery.push({ 'year_publication': { $gte: body.year_publication} });
      query['$and'].push({ '$or': yearQuery });
  }
  else if(body.year_low && body.year_high )
  {
    query['$and'].push({ 'year_publication': { $gte: body.year_low, $lte: body.year_high } }); 
  }
  else
  {
    if(body.year_publication)
      query['$and'].push({ 'year_publication': { $gte: body.year_publication} });
  }

  if(body.type != "")
    query['$and'].push({ 'type': body.type});

  Book.find(query)
    .then(books =>{
      res.status(200).send(books)})
    .catch(error => res.status(404).json({ error}));
  
}