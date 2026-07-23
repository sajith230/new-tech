import React from "react";

import { Order } from "@/lib/types";
import { getPaymentStatus } from "@/lib/utils";

import OrderItem from "./OrderItem";

type OrderDetailsProps = { orderDetails: Order };

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderDetails }) => {
  const getPaymentMethod = () => {
    let method = "";
    switch (orderDetails.paymentMethod) {
      case "cod":
        method = "Cash on Delivery";
        break;

      case "card-payment":
        method = "Card Payment";
        break;

      case "bank-transfer":
        method = "Bank Transfer";
        break;

      default:
        method = "Unknown";
        break;
    }

    return method;
  };

  return (
    <section className="relative mt-[2em] pb-[8em]">
      <div className="from-primary absolute bottom-0 left-0 aspect-square w-2/5 -translate-x-1/2 translate-y-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto grid grid-cols-1 gap-[1.5em] lg:grid-cols-2">
        <div className="space-y-[1.5em]">
          <div className="bg-foreground/10 rounded-[0.5em] p-[1.2em]">
            <p className="mb-[0.7em] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
              Your Order is Confirmed
            </p>
            <p className="text-foreground/70 text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              We have accepted your order, and we’re getting it ready. A
              confirmation mail has been sent to{" "}
              <span className="font-medium">
                {orderDetails.shippingInfo.email}
              </span>
            </p>
          </div>

          <div className="bg-foreground/10 rounded-[0.5em] p-[1.2em]">
            <p className="mb-[0.7em] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
              Customer Details
            </p>
            <div className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              <p>Email</p>
              <p className="text-foreground/70 mt-[0.4em]">
                {orderDetails.shippingInfo.email}
              </p>
            </div>

            <div className="mt-[1.5em] grid grid-cols-2 gap-[1em]">
              <div className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                <p>Billing Address</p>
                <p className="text-foreground/70 mt-[0.4em]">
                  {orderDetails.billingInfo.firstName}{" "}
                  {orderDetails.billingInfo.lastName}
                </p>
                <p className="text-foreground/70 mt-[0.4em]">
                  {orderDetails.billingInfo.address},
                </p>
                <p className="text-foreground/70 mt-[0.4em]">
                  {orderDetails.billingInfo.city},{" "}
                  {orderDetails.billingInfo.state},{" "}
                  {orderDetails.billingInfo.zipCode}
                </p>
              </div>

              <div className="text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                <p>Shipping Address</p>
                <p className="text-foreground/70 mt-[0.4em]">
                  {orderDetails.shippingInfo.firstName}{" "}
                  {orderDetails.shippingInfo.lastName}
                </p>
                <p className="text-foreground/70 mt-[0.4em]">
                  {orderDetails.shippingInfo.address},
                </p>
                <p className="text-foreground/70 mt-[0.4em]">
                  {orderDetails.shippingInfo.city},{" "}
                  {orderDetails.shippingInfo.state},{" "}
                  {orderDetails.shippingInfo.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-foreground/10 rounded-[0.5em] p-[1.2em]">
          <p className="mb-[0.7em] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
            Order Details
          </p>

          <div className="flex flex-col gap-[1em] text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
            {orderDetails.products.map((p) => {
              const key =
                p._id + p.attributes.map((a) => a.selectedVariation).join();

              return <OrderItem key={key} data={p} />;
            })}
          </div>

          <div className="my-[2em] space-y-[1em] text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
            <div className="via-foreground mb-[1em] h-px w-full bg-gradient-to-r from-transparent to-transparent"></div>

            <div className="flex justify-between">
              <p>
                Subtotal:{" "}
                {orderDetails.products.reduce((a, b) => a + b.quantity, 0)} item
                {orderDetails.products.reduce((a, b) => a + b.quantity, 0) >
                  1 && "s"}
              </p>
              <p>Rs {orderDetails.subTotal.toFixed(2)}</p>
            </div>

            {orderDetails.discountAmount > 0 && (
              <div className="flex justify-between">
                <p>Discount</p>
                <p>Rs {orderDetails.discountAmount.toFixed(2)}</p>
              </div>
            )}

            <div className="flex justify-between">
              <p>Shipping</p>
              <p>Rs {orderDetails.shippingCost.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p>Payment Method</p>
              <p>{getPaymentMethod()}</p>
            </div>

            <div className="via-foreground mt-[1em] h-px w-full bg-gradient-to-r from-transparent to-transparent"></div>
          </div>

          <div className="text-primary flex justify-between text-[16px] font-medium sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]">
            <p>Total</p>
            <p>Rs {orderDetails.grandTotal.toFixed(2)}</p>
          </div>

          <p className="mt-[1em] text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
            {getPaymentStatus(orderDetails.status)} with {getPaymentMethod()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
