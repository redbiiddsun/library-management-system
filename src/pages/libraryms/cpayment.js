import Head from "next/head";
import { Outfit } from "next/font/google";
import Navbar from "../components/navbar";
import Searchbox from "../components/searchbox";
import styles from "@/styles/components/cpayment.module.css";
import Link from 'next/link'
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { UseDialog } from "../components/dialog";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const outfit = Outfit({ subsets: ["latin"] });

function CPaymentPage() {

  const [memberID, setmemberID] = useState();
  const [resData, setResData] = useState();

  //Init Dialog
  const { handleClickToOpen, DialogComponent } = UseDialog();

  // store a dialog value
  const [resTitle, setresTitle] = useState("");
  const [resContent, setresContent] = useState("");


  function convertToFormattedDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  async function onSearch(e) {
    e.preventDefault()
    console.log(memberID)

    await axios({ method: 'get', url: `/api/GET/payment/${memberID}`, }).then(function (response) {
      setResData(response.data)
      console.log(response.data[0])
    }).catch(function (error) {
      console.log(error);

    });
  }

  async function onSubmit() {
    
    //console.log(resData[0].checkout_id)
    
    const temp = { checkoutID: resData[0].checkout_id, totalAmount: 0, staffID: 1}
    await axios.post('http://localhost:3000/api/POST/payment', temp).then(function (response) {

      setresTitle("Notification")
      setresContent(response.data.message)

      handleClickToOpen()


    }).catch(function (error) {
      console.log(error);

      setresTitle("Error")
      setresContent(`Please Contact Admin`)

      handleClickToOpen()
    });
  }

  return (
    <>

      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit&display=swap"
          rel="stylesheet"
        />
        <title>Library Management System</title>
      </Head>
      <main>
        <Navbar/>
        <span className={styles.currentmem}>Payment</span>
        <div className={styles.cmcontainer}>
          <form id='payment' onSubmit={onSearch}>
            <div className={styles.inputContainer}>
              <label htmlFor="checkout-id">Checkout ID :</label>
              <input type="text" id="checkout-id" placeholder="Checkout ID" onChange={ (e) => setmemberID(e.target.value)}></input>
            </div>

            <div className={styles.ssbox}>
              <button type="submit" form="payment">Search</button>
            </div>

          </form>
        </div>
      
      <div className={styles.bigtext}>
        <span>Borrowed Book List</span>
      </div>


      <div className={styles.bigbox}>
        <div className={styles.htext}>
          <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">BookID</TableCell>
                        <TableCell align="right">Book</TableCell>
                        <TableCell align="right">return_duration_date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {resData && resData.map((row) => (
                        <TableRow
                            key={row.staff_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="right">{row.book_id}</TableCell>
                            <TableCell align="right">{row.book_title}</TableCell>
                            <TableCell align="right">{convertToFormattedDate(row.return_duration_date)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
      </div>
      <div className={styles.backbox}>
        <Link href="/libraryms/cbook"><span>Back</span></Link>
      </div>

      <div className={styles.confirmbox}>
        <button type="submit" onClick={onSubmit}>Confirm</button>
      </div>
      <DialogComponent title={resTitle} content={resContent} />                  
    </main >
    </>
  );
}

export default CPaymentPage;



