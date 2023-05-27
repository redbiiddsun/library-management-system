import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2"

export default function getBorrowStat(req, res){

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME 
    });
    
    // GET Author 
    const getMethod = () => {
        connection.query("SELECT b.book_id, book_title, language, author_first_name,author_last_name, publisher ,COUNT(cd.checkout_id) AS Borrowstatistics FROM checkoutsdetail cd, books b,publishers p,authors a,language l WHERE b.publisher_id = p.publisher_id AND b.author_id = a.author_id AND b.language_id = l.language_id GROUP BY b.book_id",
        (err, results, fields) =>{ 

            if(results.length != 0 && !err){
                return res.status(200).json(results);
            }else{
                return res.status(400).json({error: "Invalid ID"});
            }
        })
    }


    if (req.method === 'GET') {
        getMethod();
    } else {
        return res.status(405).json({message: "Method Not Allowed. Use GET only"})
    }
    
}
