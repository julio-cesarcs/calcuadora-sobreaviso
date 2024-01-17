const job = document.querySelector('#select-job');
const dias = document.querySelector('#input-days');
const uteis = document.querySelector('#input-uteis');

const input50Percent = document.querySelector('#input-50percent');
const input80Percent = document.querySelector('#input-80percent');
const input100Percent = document.querySelector('#input-100percent');
const inputCompensacao = document.querySelector('#input-compensacao');

const btnCalculate = document.querySelector('#btn-calculate');
const btnReset = document.querySelector('#btn-reset');

const spnHoraDisposicao = document.querySelector('.hora-disposicao');
const spnValorHoraDisposicao = document.querySelector('.valor-hora-disposicao');
const spnHora50Percent = document.querySelector('.hora-50percent');
const spnHora80Percent = document.querySelector('.hora-80percent');
const spnHora100Percent = document.querySelector('.hora-100percent');;
const spnSalarioBase = document.querySelector('.salario-base');
const spnValorHora = document.querySelector('.valor-hora');
const spnValorHoraSobreaviso = document.querySelector('.valor-hora-sobreaviso');

btnReset.addEventListener('click', () => {
    limpaCampos()
    reset();
})

btnCalculate.addEventListener('click', e => {
    e.preventDefault();

    const isChecked = inputCompensacao.checked;

    const salarioBase = getSalario(job.value);
    const salarioComPericulosidade = getSalarioComPericulosidade(salarioBase)

    const valorHora = getValorHora(salarioBase);
    const valorHoraComPericulosidade = getValorHoraComPericulosidade(salarioComPericulosidade)
    const valorHoraSobreaviso = getValorHoraSobreaviso(salarioBase);
    
    const quantidadeHorasDisposicao = getHorasDisposicao(dias.value, uteis.value, isChecked) - input50Percent.value - input80Percent.value - input100Percent.value;
   
    const valorPeriodoDisposicao = getvalorPeriodoDisposicao(valorHoraSobreaviso, quantidadeHorasDisposicao);
    const valorHora50Percent = getHora50Percent(valorHoraComPericulosidade, input50Percent.value);
    const valorHora80Percent = getHora80Percent(valorHoraComPericulosidade, input80Percent.value);
    const valorHora100Percent = getHora100Percent(valorHoraComPericulosidade, input100Percent.value);


    spnSalarioBase.innerHTML = exibirValoresEmReal(salarioBase);
    spnValorHora.innerHTML = exibirValoresEmReal(valorHora);
    spnValorHoraSobreaviso.innerHTML = exibirValoresEmReal(valorHoraSobreaviso);
    spnHoraDisposicao.innerHTML = exibirValoresEmHora(quantidadeHorasDisposicao);
    spnValorHoraDisposicao.innerHTML = exibirValoresEmReal(valorPeriodoDisposicao);
    spnHora50Percent.innerHTML = exibirValoresEmReal(valorHora50Percent);
    spnHora80Percent.innerHTML = exibirValoresEmReal(valorHora80Percent);
    spnHora100Percent.innerHTML = exibirValoresEmReal(valorHora100Percent);

})


function getSalario(job) {
    if (job === 'aux-2p') return 2765.47;
    if (job === 'aux-3p') return 3113.06;
    if (job === 'tec-3p') return 4230.15;
}

function getSalarioComPericulosidade(salario){
    return salario * 1.30
}

function limpaCampos(){
    spnSalarioBase.innerHTML = '';
    spnValorHora.innerHTML = '';
    spnValorHoraSobreaviso.innerHTML = '';
    spnHoraDisposicao.innerHTML = '';
    spnValorHoraDisposicao.innerHTML = '';
    spnHora50Percent.innerHTML = '';
    spnHora80Percent.innerHTML = ''
    spnHora100Percent.innerHTML = '';
}

function getValorHora(salario) {
    return salario / 220;
}

function getValorHoraComPericulosidade(salario) {
    return salario / 220;
}

function getValorHoraSobreaviso(salario) {
    return salario / 220 / 3;
}

function getHora50Percent(valorHoraComPericulosidade, hora) {
    return valorHoraComPericulosidade * hora * 1.5;
}

function getHora80Percent(valorHoraComPericulosidade, hora) {
    return valorHoraComPericulosidade * hora * 1.8;
}

function getHora100Percent(valorHoraComPericulosidade, hora) {
    return valorHoraComPericulosidade * hora * 2.0;
}

function getHorasDisposicao(diasTotais, diasUteis, compensacao) {
    const dia24Horas = diasTotais - diasUteis;
    const totalHorasDia24Horas = dia24Horas * 24;

    const dia8_9Horas = diasUteis - 1;
    const dia9_4Horas = diasUteis - 1;

    const totalHorasDia8_9Horas = dia8_9Horas * (24 - 8.9);
    const totalHorasDia9_4Horas = dia9_4Horas * (24 - 9.4);

    const totalHorasDia8_4Horas = 24 - 8.4;

    if (compensacao) {
        return totalHorasDia24Horas + totalHorasDia9_4Horas + totalHorasDia8_4Horas;
    } else {
        return totalHorasDia24Horas + totalHorasDia8_9Horas + totalHorasDia8_4Horas;
    }
}

function getvalorPeriodoDisposicao(valorHoraSobreaviso, totalHoras){
    return valorHoraSobreaviso * totalHoras;
}

function exibirValoresEmReal(valor){
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function exibirValoresEmHora(valor){
    return valor.toFixed(2).replace('.', ',');
}