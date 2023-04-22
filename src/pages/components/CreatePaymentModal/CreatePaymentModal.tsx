import { useState } from "react";
import type { FC } from "react";
import { api } from "~/utils/api";
import Modal from "../Modal/Modal";
import type { ICreatePaymentModalProps } from "./types";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  paymentName: string;
  paymentAmount: number;
  // paymentDue: Date;
  paymentIsRecurring: boolean;
  paymentFrequency: string;
  paymentIsIncoming: boolean;
};

const CreatePaymentModal: FC<ICreatePaymentModalProps> = ({
  visible,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [paymentName, setPaymentName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDue, setPaymentDue] = useState("2023-04-27T18:44:02.819Z");
  const [paymentRecurring, setPaymentRecurring] = useState(false);
  const [paymentFreq, setPaymentFreq] = useState("");
  const [isIncoming, setIsIncoming] = useState(false);

  // const onSubmit = (data: Inputs) => console.log(data);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    // const payDate = new Date(paymentDue);

    // mutate({
    //   name: data.paymentName,
    //   amount: data.paymentAmount,
    //   dueDate: payDate,
    //   recurring: data.paymentIsRecurring,
    //   recurringFrequency: data.paymentFrequency,
    //   isIncoming: data.paymentIsIncoming,
    // });
  };

  const { mutate, isLoading: isCreatingPayment } =
    api.userPayments.createPayment.useMutation({
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;

        if (errorMessage && errorMessage[0]) {
          alert(errorMessage[0]);
          console.error(errorMessage);
        }
      },
    });

  return (
    <Modal onClose={onClose} visible={visible}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              {...register("paymentName")}
              // value={paymentName}
              // onChange={(e) => setPaymentName(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Payment Name"
            />
          </div>
          <div>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.valueAsNumber)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          {/* <div>
            <input
              type="datetime-local"
              value={paymentDue}
              onChange={(e) => setPaymentDue(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Payment Due"
            />
          </div> */}
          <div>
            <input
              type="checkbox"
              id="recurring"
              checked={paymentRecurring}
              onChange={() => setPaymentRecurring((prev) => !prev)}
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label
              htmlFor="recurring"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Recurring Payment?
            </label>
          </div>
          <div>
            <input
              type="text"
              value={paymentFreq}
              onChange={(e) => setPaymentFreq(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="recurring freq"
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="income"
              checked={isIncoming}
              onChange={() => setIsIncoming((prev) => !prev)}
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label
              htmlFor="income"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Incoming payment?
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default CreatePaymentModal;