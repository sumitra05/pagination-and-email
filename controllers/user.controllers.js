const path = require('path')
const express = require("express");
const transporter = require("../configs/mail");

const User = require("../models/user.models");
const router = express.Router();
/* 
    body => req.body
    url => req.prams
    query  string = req.query
*/

router.get("", async (req, res) => {
  try {
    /*  
        req.query.pagesize = 30
         req.query.pagesize  || 10 return 30
         req.query.pagesize  && 10 return 10
         req.query.pagesize = undefined
         req.query.pagesize  || 10 return 10
         req.query.pagesize  && 10 return undefined
 */

    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10;

    // if page = 1 then data should be from 1 to 30
    // if page = 2 then data should be from 31 to 60

    const skip = (page - 1) * pagesize; // 1 -1 = 0 0 * anything = 0
    // page = 2 then 2-1 = 1 and 1 * pagesize = 30

    const user = await User.find()
      .skip(skip)
      .limit(pagesize)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await User.find().countDocuments()) / pagesize
    );

    return res.status(200).send({ user, totalPages });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req,res) => {
  try {

const  user  =   await User.create(req.body);
console.log(user.first_name)
    // send mail with defined transport object
      transporter.sendMail({
      // from: '"Fred Foo 👻" <foo@example.com>', // sender address
      from: '"Sumitra Awadhiya👻" <sumitra9039sumi@gmail.com>', // sender address
      // // to: "bar@example.com, baz@example.com", // list of receivers
      to : user.email, 
      subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`, // Subject line
      text: `Hi ${user.first_name}, Please confirm your email address`, // plain text body
      // html: "<b>Welcome to ABC system</b>", // html body

      alternatives : [
        {
          contentType : 'text/html',
          path :  path.join(__dirname, "../mailers/user.create.mail.html")

        },
        {
          filename : "user-details.txt",
          path :  path.join(__dirname, "../mailers/product.details.txt")

        }
      ]
    });

    return res.status(201).send({message : "User Registration successfully"})
  } catch (err) {
return res.status(500).send({err : err.message})
  };
});

module.exports = router;