"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { VscBracketError } from "react-icons/vsc";

import api from "@/lib/axios-instance";
import { useItemStore } from "@/store/item-store";
import { useCartStore } from "@/store/cart-store";

import { CartItemAttribute, Order, Product } from "@/lib/types";
import Header from "@/components/user/summary-page/Header";
import OrderDetails from "@/components/user/summary-page/OrderDetails";

const OrderSummaryPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useItemStore.getState().clearItem();
  useCartStore.getState().clearCart();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/order/${id}`);
        const d = res.data;
        const formattedData: Order = {
          products: d.products.map(
            (p: {
              product: Product;
              attributes: CartItemAttribute[];
              orderQuantity: number;
            }) => ({
              _id: p.product._id,
              title: p.product.title,
              productImage: p.product.productImages[0],
              price: p.product.discountPrice,
              attributes: p.attributes.map((a) => ({
                attribute: { _id: a.attribute._id, name: a.attribute.name },
                selectedVariation: a.selectedVariation,
              })),
              quantity: p.orderQuantity,
            }),
          ),
          subTotal: d.subTotal,
          discountAmount: d.discountAmount,
          shippingCost: d.shippingCost,
          grandTotal: d.grandTotal,
          shippingInfo: d.shippingInfo,
          billingInfo: d.billingInfo,
          paymentMethod: d.paymentMethod,
          status: d.status,
        };
        setOrderDetails(formattedData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {error && (
        <section className="relative py-[8em]">
          <div className="px-container container mx-auto">
            <div className="bg-foreground/10 border-foreground/30 flex h-[200px] flex-col items-center justify-center gap-[0.3em] rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
              <VscBracketError className="text-[3em]" />
              <p>Something went wrong</p>
              <p className="mt-[0.5em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
                We couldn&apos; fetch your order details. Please try again
                later.
              </p>
              <Link
                href="/products"
                className="border-foreground hover:bg-foreground hover:text-background mt-[0.5em] rounded-full border-2 px-[1em] py-[0.4em] text-[12px] transition-all duration-300 ease-in sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {!error && loading && (
        <section className="relative py-[8em]">
          <div className="px-container container mx-auto">
            <div className="bg-foreground/10 border-foreground/30 flex h-[200px] animate-pulse flex-col items-center justify-center gap-[0.3em] rounded-[1em] border p-[1em] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
              <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
                Loading order details
              </p>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && orderDetails && (
        <>
          <Header firstName={orderDetails.shippingInfo.firstName} />
          <OrderDetails orderDetails={orderDetails} />
        </>
      )}
    </>
  );
};

export default OrderSummaryPage;
