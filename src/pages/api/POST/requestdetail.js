import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2"
import connection from "../../../lib/DBconnection"

export default function insertRequestDetail(req, res){
    
    const postMethod = () => {
      const {request_id, title, language, author, publisher} = req.body;
      
      connection.query(`INSERT INTO requestdetail (request_id, request_title, language_id, author_id, publisher_id, request_status)
       VALUES (?, ?, ?, ?, ?, 'Pending');`,
        [request_id, title, language, author, publisher],
        (err, results, fields) =>{
          if(err){
            console.log("Error while inserting", err);
            return res.status(400).send(err);
          }
          return res.status(201).json({message: "RequestDetail successfuly inserted!"})
      })
    }

  if (req.method === 'POST') {
    postMethod();
  } else {
    return res.status(405).json({message: "Method Not Allowed. Use POST only"})
  }

}

