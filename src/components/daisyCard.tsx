import { useState, useEffect } from 'react';
import { useScroll } from 'react-use-gesture';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const DaisyCard = () => {
    const [scrollDown, setScrollDown] = useState(true);
    const [hasEntered, setHasEntered] = useState(false);
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: false,
        delay: 200, // Adds 200ms debounce to inView changes
      });
  
    // Track scroll direction
    useScroll(
      ({ direction: [, y] }) => setScrollDown(y > 0),
      { domTarget: window }
    );
  
    // Reset "hasEntered" when scrolled past the element
    useEffect(() => {
      if (!inView && scrollDown) setHasEntered(false);
    }, [inView, scrollDown]);
  
    const springs = useSpring({
      from: { x: -100, opacity: 0 },
      to: async (next) => {
        if (inView && !hasEntered) {
          await next({ x: 0, opacity: 1 }); // Animate in (only once)
          setHasEntered(true);
        } else if (!inView && !scrollDown && hasEntered) {
          await next({ x: 100, opacity: 0 }); // Animate out (only on scroll up)
        }
      },
      config: { tension: 200, friction: 20 },
    });

    return (

            <animated.div
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

            </animated.div>
       
    )
}

export default DaisyCard