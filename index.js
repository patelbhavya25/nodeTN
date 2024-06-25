let express = require("express");

let app = express();
require("dotenv").config();
app.use(express.json());

let product = [];

app.get("/product", (req, res) => {
  try {
    res.status(200).send({ data: product });
  } catch (err) {
    res.status(500).send({
      msg: err,
    });
  }
});
app.post("/createproduct", (req, res) => {
  try {
    let obj = req.body;
    obj.id = product.length + 1;
    obj.isdeleted = false;
    product.push(obj);
    console.log(req.body);
    res.status(200).send({
      msg: "product added sucessfully",
    });
  } catch (err) {
    res.status(500).send({
      msg: err,
    });
  }
});

app.get("/product", (req, res) => {
  try {
    let softdel = product.filter((val) => {
      if (val.isdeleted == false) {
        return true;
      }
    });
    res.status(200).send(softdel);
  } catch (err) {
    res.status(500).send({
      msg: err,
    });
  }
});




app.delete("/softdeleteproduct", (req, res) => {
  try {
    let id1 = req.query.id;
    let del = product.find((val) => val.id == id1);
    del.isdeleted = true;
    res.status(200).send({ msg: "product soft deleted successfully" });
    console.log(product);
  } catch (err) {
    res.status(500).send({
      msg: err,
    });
  }
});

app.get("/sortaesdes", (req, res) => {
  try {

    let sor=req.query.sor;
   let arr= product.sort((a,b)=>{
        if(sor=="asc"){
            return a.cost - b.cost;
        }else if(sor==="dsc"){
            return b.cost-a.cost;
        }else{
            res.status(404).send({msg :"product isnot there"})
        }
        
    })
    console.log(arr)
    res.status(200).send(arr)
   
    
} 

catch (err) {
    res.status(500).send({
      msg: err,
    });
  }
});

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("server is running on " + process.env.PORT);
  }
});
