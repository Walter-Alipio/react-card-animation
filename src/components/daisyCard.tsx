import { useScrollAnimation } from './useScrollAnimation';
import { useForm, SubmitHandler } from "react-hook-form"

type CpfCnpj = {
    cpfCnpj: string,
}

const DaisyCard = () => {
    const { ref, springs, AnimatedDiv } = useScrollAnimation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<CpfCnpj>()
      const onSubmit: SubmitHandler<CpfCnpj> = (data) => console.log(data)

      console.log(watch("cpfCnpj")) // watch input value by passing the name of it

    return (
            <AnimatedDiv
                ref={ref}
                style={springs}
                className="bg-white dark:bg-gray-700 rounded-lg m-5 p-10 min-h-[45vh] w-sm md:w-md flex flex-col justify-around"
                {...({} as any)}
            >
                <h6 className="font-bold text-4xl text-gray-700 dark:text-gray-50 font-sans">Consulte suas dívidas<br /> agora mesmo!</h6>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="mb-7">
                        <legend className="text-md text-gray-600 dark:text-gray-50 mb-3">Busque pelo seu CPF ou CNPJ</legend>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            {...register('cpfCnpj', { required: true})}    
                        />
                        {errors.cpfCnpj && <span className='text-red-800'>Campo obrigatório</span>}
                    </fieldset>
                    <fieldset className="mb-7">
                        <input type="checkbox" name="tmUso" id="tmUso" />
                        <span className="text-gray-600 dark:text-gray-50 ml-3">Li e concordo com os <a href="#" className="text-blue-400 font-semibold hover:link">Termos de Uso.</a></span>
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