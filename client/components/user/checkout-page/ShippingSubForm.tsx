import React from "react";

type ShippingSubFormProps = {
  error: boolean;
  loading: boolean;
  shippingFee: number;
};

const ShippingSubForm: React.FC<ShippingSubFormProps> = ({
  error,
  loading,
  shippingFee,
}) => {
  return (
    <div className="relative">
      <p className="mb-[0.6em] text-[15px] font-medium sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[28px] 2xl:text-[31px]">
        Shipping method
      </p>
      {error && (
        <div className="border-foreground/15 mb-[2em] flex justify-between rounded-[0.5em] border p-[1em]">
          <div>
            <p className="text-destructive">Error</p>
            <p className="text-foreground/40">
              Failed to Load Shipping Details
            </p>
          </div>
        </div>
      )}

      {!error && loading && (
        <div className="border-foreground/15 mb-[2em] flex animate-pulse justify-between rounded-[0.5em] border p-[1em]">
          <div>
            <p>Loading</p>
            <p className="text-foreground/40">Please wait</p>
          </div>
        </div>
      )}

      {!error && !loading && (
        <div className="border-foreground/15 mb-[2em] flex justify-between rounded-[0.5em] border p-[1em]">
          <div>
            <p>Standard</p>
            <p className="text-foreground/40">2-3 Business Days</p>
          </div>
          {shippingFee === 0 && <p>FREE</p>}
          {shippingFee > 0 && <p>Rs {shippingFee}</p>}
        </div>
      )}
    </div>
  );
};

export default ShippingSubForm;
