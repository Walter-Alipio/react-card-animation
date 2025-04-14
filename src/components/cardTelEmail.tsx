import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";


const formConfirmSchema = z.object({
    celphoneInp: z
      .string({
        required_error: 'Celular é obrigatório.',
      })
      .transform((val) => val.replace(/\D/g, '')) // Remove não numéricos antes da validação
      .refine((val) => val.length === 11, 'Celular deve conter 11 dígitos.') // Valida o comprimento exato
      .refine((val) => /^\d+$/.test(val), 'Celular deve conter apenas números.'), // Garante que são apenas dígitos
    emailInp: z.string().email({ message: 'Email inválido.' }).min(5, { message: 'Email deve ter no mínimo 5 caracteres.' }),
  });

type formConfirm = z.infer<typeof formConfirmSchema>;

const CardTelEmail = () => {

        const [apiState, setApiState] = useState<
            'idle' | 'loading' | 'success' | 'error' | 'not_found'
        >('idle');
        const [apiError, setApiError] = useState<string | null>(null);

        const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
        } = useForm<formConfirm>({ resolver: zodResolver(formConfirmSchema) });

        const onSubmit: SubmitHandler<formConfirm> = (data) => console.log(data);

        const formatPhoneNumber = (value: string): string => {
            const cleanedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
            const length = cleanedValue.length;
          
            if (length === 0) {
              return '';
            }
          
            if (length <= 2) {
              return `(${cleanedValue}`;
            }
          
            if (length === 3) {
              return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2)}`;
            }
          
            if (length <= 7) {
              return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}`;
            }
          
            return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
          };

        return (
            <article
                className="bg-white dark:bg-gray-700 rounded-lg m-5 p-10 min-h-[45vh] w-sm md:w-md flex flex-col justify-around"
            >
                <h6 className="font-bold text-4xl text-gray-700 dark:text-gray-50 font-sans">Informe celular e e-mail para visualizar</h6>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="mb-7">
                        <label className="text-md text-gray-600 dark:text-gray-50 mb-3">Insira o celular</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            {...register('celphoneInp')}
                            onChange={(e) => {
                                const { value } = e.target;
                                e.target.value = formatPhoneNumber(value);
                                // onChange(e);
                            }}
                            maxLength={18}
                        />
                        {errors.celphoneInp && <span className='text-red-800'>{errors.celphoneInp.message}</span>}
                    </fieldset>
                    <fieldset className="mb-7">
                        <label className="text-md text-gray-600 dark:text-gray-50 mb-3">Insira o e-mail</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            {...register('emailInp')}
                            maxLength={24}
                        />
                        {errors.emailInp && <span className='text-red-800'>{errors.emailInp.message}</span>}
                    </fieldset>

                    <button
                        type="submit"
                        className="bg-blue-700 text-white font-bold py-2 px-4 rounded w-full hover:cursor-pointer active:bg-blue-500"
                    >Confirmar</button>
                </form>
            </article>
        );
    }

    export default CardTelEmail