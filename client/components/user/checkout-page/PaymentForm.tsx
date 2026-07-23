"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import axios from "axios";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CartItem, CreateCouponData, PaymentSettings } from "@/lib/types";
import { PaymentFormSchema, PaymentFormType } from "@/lib/validation";
import { useAuthStore } from "@/store/auth-store";
import { useItemStore } from "@/store/item-store";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

import api from "@/lib/axios-instance";
import Empty from "./Empty";
import ContactSubForm from "./ContactSubForm";
import DeliverySubForm from "./DeliverySubForm";
import ShippingSubForm from "./ShippingSubForm";
import PayMethodSubForm from "./PayMethodSubForm";
import BillingSubForm from "./BillingSubForm";
import RememberAddressSubForm from "./RememberAddressSubForm";
import OrderSummary from "./OrderSummary";

const PaymentForm = () => {
  const { user, setUser } = useAuthStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const singleItem = searchParams.get("singleItem") === "true";

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    bankTransfer: { enabled: true, availableAccounts: [] },
    cod: {
      enabled: true,
      title: "",
      description: "",
    },
    cardPayment: {
      enabled: true,
    },
    shippingFee: 0,
  });
  const [coupon, setCoupon] = useState<CreateCouponData | null>(null);

  let items: CartItem[] = [];
  let totalPrice: number = 0;

  if (singleItem) {
    items.push(useItemStore.getState().item);
    totalPrice =
      useItemStore.getState().item.price *
      useItemStore.getState().item.quantity;
  } else {
    items = useCartStore.getState().items;
    totalPrice = useCartStore.getState().totalPrice();
  }

  const methods: UseFormReturn<PaymentFormType> = useForm<PaymentFormType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      email: user?.email,
      shippingInfo: {
        ...user?.shippingInfo,
        tel: user?.shippingInfo.phoneNo,
        zip: user?.shippingInfo.zipCode,
      },
      differentBillingAddress: user ? true : false,
      billingInfo: {
        ...user?.billingInfo,
        tel: user?.billingInfo.phoneNo,
        zip: user?.billingInfo.zipCode,
      },
      remeberAddressInfo: false,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: PaymentFormType) => {
    let discountPrice = 0;

    if (coupon && coupon.couponType === "exact") discountPrice = coupon.value;
    if (coupon && coupon.couponType === "percentage")
      discountPrice = totalPrice * (coupon.value / 100);

    const shippingInfo = {
      firstName: data.shippingInfo.firstName,
      lastName: data.shippingInfo.lastName,
      phoneNo: data.shippingInfo.tel,
      email: data.email,
      address: data.shippingInfo.address,
      city: data.shippingInfo.city,
      state: data.shippingInfo.state,
      zipCode: data.shippingInfo.zip,
    };

    let billingInfo = shippingInfo;
    if (data.differentBillingAddress && data.billingInfo)
      billingInfo = {
        firstName: data.billingInfo.firstName,
        lastName: data.billingInfo.lastName,
        phoneNo: data.billingInfo.tel,
        email: data.email,
        address: data.billingInfo.address,
        city: data.billingInfo.city,
        state: data.billingInfo.state,
        zipCode: data.billingInfo.zip,
      };

    const payload = {
      products: items.map((i) => ({
        product: i._id,
        attributes: i.attributes.map((a) => ({
          attribute: a.attribute._id,
          selectedVariation: a.selectedVariation,
        })),
        orderQuantity: i.quantity,
        totalPrice: i.price * i.quantity,
      })),
      subTotal: totalPrice,
      discountAmount: discountPrice,
      shippingCost: paymentSettings.shippingFee,
      grandTotal: totalPrice - discountPrice + paymentSettings.shippingFee,
      user: user?._id,
      shippingInfo,
      billingInfo,
      paymentMethod: data.paymentMethod,
      status:
        data.paymentMethod === "card-payment" ? "paid" : "pending-payment",
    };

    try {
      if (user && data.remeberAddressInfo) {
        const userRes = await api.patch(`/user/${user._id}?field=addressInfo`, {
          shippingInfo,
          billingInfo,
        });
        setUser(userRes.data);
      }

      const orderRes = await api.post("/order", payload);
      const id = orderRes.data._id;
      toast.success("Order placed successfully!");
      reset();

      router.push(`/summary?id=${id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const message = err.response.data.message;
        toast.error(message);
      } else {
        toast.error("Failed to place order. Please try again later.");
      }
    }
  };

  const onError = () => {
    toast.error("Please fill all form fields");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/payment`);
        const data = res.data;

        setPaymentSettings({
          bankTransfer: {
            enabled: data.bankTransfer.enabled,
            availableAccounts: data.bankTransfer.availableAccounts,
          },
          cod: {
            enabled: data.cod.enabled,
            title: data.cod.title,
            description: data.cod.description,
          },
          cardPayment: {
            enabled: data.cardPayment.enabled,
          },
          shippingFee: data.shippingFee,
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="grid grid-cols-1 gap-[1.5em] lg:grid-cols-10"
    >
      {(items.length === 0 || items[0]._id === "") && <Empty />}

      {items.length > 0 && items[0]._id !== "" && (
        <>
          <div className="text-[12px] sm:text-[13px] md:text-[14px] lg:col-span-6 lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
            <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
              Delivery Information
            </p>
            <div className="bg-foreground/10 mt-[1.5em] rounded-[0.5em] p-[1.5em]">
              <FormProvider {...methods}>
                <ContactSubForm />
                <DeliverySubForm />
                <ShippingSubForm
                  error={error}
                  loading={loading}
                  shippingFee={paymentSettings.shippingFee}
                />
                <PayMethodSubForm
                  error={error}
                  loading={loading}
                  paymentSettings={paymentSettings}
                />
                <BillingSubForm />
                {user && <RememberAddressSubForm />}
              </FormProvider>
            </div>
          </div>

          <div className="text-[12px] sm:text-[13px] md:text-[14px] lg:col-span-4 lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
            <p className="text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
              Order Summary
            </p>
            <div className="bg-foreground/10 mt-[1.5em] rounded-[0.5em] p-[1.5em]">
              <FormProvider {...methods}>
                <OrderSummary
                  loading={loading}
                  error={error}
                  items={items}
                  coupon={coupon}
                  setCoupon={setCoupon}
                  shippingFee={paymentSettings.shippingFee}
                  totalPrice={totalPrice}
                />
              </FormProvider>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default PaymentForm;
