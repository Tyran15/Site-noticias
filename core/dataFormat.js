function converterDataFormato(input) {
    const partes = input.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
}