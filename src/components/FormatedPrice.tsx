interface Amount {
    amount:string | number;
}

const FormatedPrice = ({amount} : Amount) => {
  
    const formattedAmount = new Number(amount).toLocaleString("pt-br" , {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits:2,
    });

  return (
    <span>
      {formattedAmount}
    </span>
  )
}

export default FormatedPrice
