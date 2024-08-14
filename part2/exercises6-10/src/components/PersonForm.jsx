const PersonForm = ({
  onSubmitAction,
  inputName,
  inputNameHandler,
  inputNumber,
  inputNumberHandler,
}) => {
  return (
    <form onSubmit={onSubmitAction}>
      <div>
        name: <input value={inputName} onChange={inputNameHandler} />
      </div>
      <div>
        number: <input value={inputNumber} onChange={inputNumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;