import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('zipcode', shippingAddress.zipcode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, zipcode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, zipcode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          zipcode,
          country,
        },
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="Shipping information">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        {/* FULL NAME */}
        <div className="mb-4">
          <label htmlFor="fullName">Full Name :</label>
          <input
            className="w-full mt-2"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        {/* ADDRESS */}
        <div className="mb-4">
          <label htmlFor="address">Address :</label>
          <input
            className="w-full mt-2"
            id="address"
            autoFocus
            {...register('address', {
              required: 'Please enter address',
              minLength: {
                value: 3,
                message: 'Address has to be more than 3 characters long',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        {/* CITY */}
        <div className="mb-4">
          <label htmlFor="city">City :</label>
          <input
            className="w-full mt-2"
            id="city"
            autoFocus
            {...register('city', {
              required: 'Please enter City',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        {/* ZIPCODE */}
        <div className="mb-4">
          <label htmlFor="zipcode">Zipcode :</label>
          <input
            className="w-full mt-2"
            id="zipcode"
            autoFocus
            {...register('zipcode', {
              required: 'Please enter Zipcode',
            })}
          />
          {errors.zipcode && (
            <div className="text-red-500">{errors.zipcode.message}</div>
          )}
        </div>
        {/* COUNTRY */}
        <div className="mb-4">
          <label htmlFor="country">Country :</label>
          <input
            className="w-full mt-2"
            id="country"
            autoFocus
            {...register('country', {
              required: 'Please enter Country',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
