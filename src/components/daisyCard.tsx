import { useScrollAnimation } from './useScrollAnimation';
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { useState } from 'react';

const formConsultSchema = z.object({
    cpfCnpj: z
        .string({
            required_error: 'CPF/CNPJ é obrigatório.',
        })
        .refine((doc) => {
            const replacedDoc = doc.replace(/\D/g, '');
            return replacedDoc.length >= 11;
        }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
        .refine((doc) => {
            const replacedDoc = doc.replace(/\D/g, '');
            return replacedDoc.length <= 14;
        }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
        .refine((doc) => {
            const replacedDoc = doc.replace(/\D/g, '');
            return !!Number(replacedDoc);
        }, 'CPF/CNPJ deve conter apenas números.'),
    tmUso: z.literal(true, {
        errorMap: () => ({ message: "Obrigatório aceitar os termos de uso" }),
    }),
});

type formConsult = z.infer<typeof formConsultSchema>;

const DaisyCard = () => {
    const { ref, springs, AnimatedDiv } = useScrollAnimation();

    const [apiState, setApiState] = useState<
        'idle' | 'loading' | 'success' | 'error' | 'not_found'
    >('idle');
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<formConsult>({ resolver: zodResolver(formConsultSchema) });

    const onSubmit: SubmitHandler<formConsult> = async (data) => {
        try {
            setApiState('loading');

            await new Promise(resolve => setTimeout(resolve, 3000));

            setApiState('not_found');
            setApiError(`Nenhum acordo encontrado para ${data.cpfCnpj}`);
            // // Simulate API call (replace with your actual API call)
            // const response = await fetch('/your-api-endpoint', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         cpfCnpj: data.cpfCnpj.replace(/\D/g, '')
            //     }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });

            // const result = await response.json();

            // if (!response.ok) {
            //     if (response.status === 404) {
            //         setApiState('not_found');
            //         setApiError(`Nenhum acordo encontrado para ${data.cpfCnpj}`);
            //     } else {
            //         throw new Error('API Error');
            //     }
            // } else {
            //     setApiState('success');
            //     // Handle successful response here
            // }
        } catch (error) {
            setApiState('error');
            setApiError('Ops, parece que ocorreu um erro interno, tente novamente mais tarde');
        }
    };

    const resetForm = () => {
        reset();
        setApiState('idle');
        setApiError(null);
    };

    const formatCpfCnpj = (value: string) => {
        const cleanedValue = value.replace(/\D/g, ''); // remove caracteres não numéricos

        if (cleanedValue.length <= 11) {
            // CPF
            return cleanedValue
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        } else {
            // CNPJ
            return cleanedValue
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        }
    };

    // Render different states
    if (apiState === 'loading') {
        return (
            <AnimatedDiv
                className="bg-white dark:bg-gray-700 rounded-lg m-5 p-10 min-h-[45vh] w-sm md:w-md flex flex-col justify-center items-center"
                {...({} as any)}
            >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-50">Buscando informações...</p>
            </AnimatedDiv>
        );
    }

    if (apiState === 'not_found' || apiState === 'error') {
        return (
            <AnimatedDiv
                {...({} as any)}
                className="bg-white dark:bg-gray-700 rounded-lg m-5 p-10 min-h-[45vh] w-sm md:w-md flex flex-col justify-center">
                <div className="text-center mb-6">
                    <div className="text-red-500 text-5xl mb-3">⚠️</div>
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-50 mb-2">
                        {apiState === 'not_found' ? 'Nenhum acordo encontrado' : 'Erro no servidor'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-50">{apiError}</p>
                </div>
                <button
                    onClick={resetForm}
                    className="bg-blue-700 text-white font-bold py-2 px-4 rounded w-full hover:cursor-pointer active:bg-blue-500"
                >
                    Tentar novamente
                </button>
            </AnimatedDiv>
        );
    }

    return (
        <AnimatedDiv
            ref={ref}
            style={springs}
            className="bg-white dark:bg-gray-700 rounded-lg m-5 p-10 min-h-[45vh] w-sm md:w-md flex flex-col justify-around border-cyan-300"
            {...({} as any)}
        >
            <h6 className="font-bold text-4xl text-gray-700 dark:text-gray-50 font-sans">Consulte suas dívidas<br /> agora mesmo!</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="mb-7">
                    <legend className="text-md text-gray-600 dark:text-gray-50 mb-3">Busque pelo seu CPF ou CNPJ</legend>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        {...register('cpfCnpj')}
                        onChange={(e) => {
                            const { value } = e.target;
                            e.target.value = formatCpfCnpj(value);
                            // onChange(e);
                        }}
                        maxLength={18}
                    />
                    {errors.cpfCnpj && <span className='text-red-800'>{errors.cpfCnpj.message}</span>}
                </fieldset>
                <fieldset className="mb-7 flex flex-col">
                    <label htmlFor="tmUso-checkbox">
                        <input
                            type="checkbox"
                            id='tmUso-checkbox'
                            {...register('tmUso')} />
                        <span className="text-gray-600 dark:text-gray-50 ml-3">Li e concordo com os <a href="#" className="text-blue-400 font-semibold hover:link">Termos de Uso.</a></span>
                    </label>
                    {errors.tmUso && <span className='text-red-800'>{errors.tmUso.message}</span>}
                </fieldset>
                <button
                    type="submit"
                    className="bg-blue-700 text-white font-bold py-2 px-4 rounded w-full hover:cursor-pointer active:bg-blue-500"
                >Confirmar</button>
            </form>
        </AnimatedDiv>
    )
}

export default DaisyCard