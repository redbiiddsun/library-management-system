import Head from "next/head";
import { Outfit } from "next/font/google";
import Navbar from "../components/navbar";
import Searchbox from "../components/searchbox";
import styles from "@/styles/components/cmemberadd.module.css";
import Link from 'next/link'
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import { UseDialog } from "../components/dialog";
import { useState, useEffect } from "react";


const outfit = Outfit({ subsets: ["latin"] });

function CmemberAddPage() {

  //Init Dialog
  const { handleClickToOpen, DialogComponent } = UseDialog();

  // store a dialog value
  const [resTitle, setresTitle] = useState("");
  const [resContent, setresContent] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    await axios.post('http://localhost:3000/api/POST/member', data).then(function (response) {

      setresTitle(response.data.message)
      setresContent(`MemberID is ${response.data.memberID}`)

      handleClickToOpen()


    }).catch(function (error) {
      console.log(error);

      setresTitle("Error")
      setresContent(`Please Contact Admin`)

      handleClickToOpen()
    });
    reset({ ...data })
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        firstname: '', midname: '', lastname: '', DOB: '',
        NationID: '', phone: '', email: '', addresses1: '', addresses2: '',
        city: '', country: '', postcode: ''
      });
    }
  }, [formState, reset]);

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
        <Navbar />

        <span className={styles.currentmem}>Add Member</span>

        <div className={styles.cmcontainer}>
          <Searchbox />
          <div className={styles.searchbox}></div>

          <div className={styles.formgroupbigger}>
            <form id="member" className={styles.formgroup} onSubmit={handleSubmit(onSubmit)}>

              <div className={styles.inputContainer}>
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" placeholder="First Name" {...register("firstname", {required: true})} required/>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="mid-name">Mid Name</label>
                <input type="text" id="mid-name" placeholder="Mid Name" {...register("midname")}></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" placeholder="Last Name" {...register("lastname", {required: true})} required></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="birthday">Birthday</label>
                <input type="date" id="birthday" placeholder="DD/MM/YYYY" {...register("DOB", {required: true})} required></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="idno">ID Number</label>
                <input type="text" id="idno" placeholder="13 Identification Numbers" {...register("NationID", {required: true})} required></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" placeholder="xxx-xxx-xxxx" {...register("phone", {required: true})} required></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="xxxxx@email.com" {...register("email", {required: true})} required></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="address1">Address 1</label>
                <input type="text" id="address1" placeholder="" {...register("addresses1", {required: true})} required></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="address2">Address 2</label>
                <input type="text" id="address2" placeholder="" {...register("addresses2")}></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="" {...register("city", {required: true})} required></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="country">Country</label>
                <input type="text" id="country" placeholder="" {...register("country", {required: true})} required></input>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="zip">ZIP</label>
                <input type="text" id="zip" placeholder="" {...register("postcode", {required: true})} required></input>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.backbox}>
          <Link href="/libraryms/cmember"><span>Back</span></Link>
        </div>

        <div className={styles.confirmbox}>
          <button type="submit" form="member">Confirm</button>
        </div>
        <DialogComponent title={resTitle} content={resContent} />
      </main>

    </>
  );
}

export default CmemberAddPage;