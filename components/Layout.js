import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Lowkey' : 'Lowkey Shop'}</title>
        <meta name="description" content="Lowkey Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <Navbar></Navbar>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          Copyright © Lowkey
        </footer>
      </div>
    </>
  );
}

export default Layout;
