import { useScrollAnimation } from './useScrollAnimation';

const DaisyCard = () => {
    const { ref, springs, AnimatedDiv } = useScrollAnimation();

    return (
            <AnimatedDiv
                ref={ref}
                style={springs}
                className="bg-white rounded-lg m-5 p-10 min-h-[45vh] w-sm md:w-md flex flex-col justify-around"
                {...({} as any)}
            >
                <h6 className="font-bold text-4xl text-gray-700 font-sans">Consulte suas dívidas<br /> agora mesmo!</h6>
                <form action="">
                    <fieldset className="mb-7">
                        <legend className="text-md text-gray-600 mb-3">Busque pelo seu CPF ou CNPJ</legend>
                        <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </fieldset>
                    <fieldset className="mb-7">
                        <input type="checkbox" name="tmUso" id="tmUso" className='bg-white' />
                        <span className="text-gray-600 ml-3">Li e concordo com os <a href="#" className="text-blue-400 font-semibold hover:link">Termos de Uso.</a></span>
                    </fieldset>
                    <button type="button" className="bg-blue-700 text-white font-bold py-2 px-4 rounded w-full hover:cursor-pointer">Confirmar</button>
                </form>
            </AnimatedDiv>
    )
}

export default DaisyCard