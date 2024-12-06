import React, { useState } from "react";
import ShareComponent from "../../Componentes/Share/Acao";

const Share = () => {
    const [codigoAcao, setCodigoAcao] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCodigo = event.target.value.toUpperCase();
        const isValidCodigo = /^[A-Z]{4}[0-9]+$/.test(inputCodigo);

        setCodigoAcao(inputCodigo);
        setError(isValidCodigo ? null : "Código de ação inválido. Por favor, insira um código válido.");
    };

    const renderError = error && <p className="text-red-500 mt-2">{error}</p>;
    const renderShareComponent = codigoAcao && !error && <ShareComponent symbol={codigoAcao} />;

    return (
        <div className="flex flex-col items-center">
            <img
                src={B3Logo}
                alt="Logo B3"
                className="w-6/12 rounded-lg mb-12"
            />
            <div className="w-full max-w-md mb-6">
                <label htmlFor="codigoAcao" className="block text-lg text-left font-bold mb-2">
                    Código da Ação
                </label>
                <input
                    id="codigoAcao"
                    className="w-full p-2 w-96 border border-gray-300 rounded"
                    placeholder="Digite o código da ação (Exemplo: PETR4, BOVA11)"
                    value={codigoAcao}
                    onChange={handleChange}
                />
                {renderError}
            </div>
            {renderShareComponent}
        </div>
    );
};

export default Share;
