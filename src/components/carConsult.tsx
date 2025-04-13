import { useState } from 'react';

const CardConsult = () => {
    const [documentNumber, setDocumentNumber] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsErrorVisible, setTermsErrorVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleDocumentNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDocumentNumber(event.target.value);
      // Implement your CPF/CNPJ validation logic here if needed
    };
  
    const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTermsAccepted(event.target.checked);
      setTermsErrorVisible(false); // Hide error when they interact with the checkbox
    };
  
    const handleSearch = () => {
      if (!termsAccepted) {
        setTermsErrorVisible(true);
        return;
      }
  
      setIsLoading(true);
      // Simulate an API call
      setTimeout(() => {
        console.log('Searching for:', documentNumber);
        setIsLoading(false);
        // Redirect or update state based on search results
      }, 1500);
    };
  
    return (
      <div
        id="box_consulta"
        className="lg:float-right mt-5 ml-3 lg:ml-0 lg:mr-0 aos-init aos-animate"
        data-aos="fade-right"
      >
        <div className="bg-white p-3 mt-5 rounded-md shadow-md">
          <div>
            <h6 className="font-semibold">Consulte suas dívidas agora mesmo!</h6>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Busque pelo seu CPF ou CNPJ</p>
          </div>
          {/* Caixa de texto do documento */}
          <div
            id="background-loading"
            style={{
              backgroundImage: isLoading ? `url('../../Content/Assets/assets/Images/loading.gif')` : 'none',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              paddingRight: '2.5rem', // Adjust based on your loading image size
            }}
            className="relative mt-2"
          >
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              name="txtCPFCNPJ"
              id="txtCPFCNPJ"
              value={documentNumber}
              onChange={handleDocumentNumberChange}
              placeholder="Digite seu CPF ou CNPJ"
              // You would implement your cpfcnpj-only logic here or with a library
            />
          </div>
          <div className="mt-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="termos-accept"
                className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              <label htmlFor="termos-accept" className="ml-2 text-sm text-gray-700">
                Li e concordo com os <a href="../../Content/Assets/assets/Images/privacidade.pdf" className="font-bold text-blue-600 hover:underline">Termos de Uso.</a>
              </label>
            </div>
          </div>
          {termsErrorVisible && (
            <div id="divObrigatorio" className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-3 text-center">
              Obrigatório concordar com os termos de uso
            </div>
          )}
          <div className="mt-5 mb-5">
            <button
              id="btnSearch"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Buscando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    );
}

export default CardConsult