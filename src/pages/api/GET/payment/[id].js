import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2"
import connection from "../../../../lib/DBconnection"

export default function getPayment(req, res) {

    // GET Member with MemberID 
    const getMethod = () => {
        connection.query(`SELECT t.checkout_id, t.book_id, b.book_title, t.return_duration_date FROM 
        (SELECT * FROM checkoutsdetail WHERE checkout_id=?) t, books b WHERE b.book_id = t.book_id`, [req.query.id],
            (err, results, fields) => {
                if (results.length != 0 && !err) {
                    return res.status(200).json(results);
                } else {
                    return res.status(400).json({ error: "Invalid ID" });
                }
            })
    }


    if (req.method === 'GET') {
        getMethod();
    } else {
        return res.status(405).json({ message: "Method Not Allowed. Use GET only" })
    }

}

