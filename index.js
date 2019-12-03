
export const incase = (condition) => (onMatch) => (value, signalMatched) => {
  if (condition(value)) {
    signalMatched && signalMatched();
    return onMatch(value);
  }
};

export const incaseVal = (val1) => incase(val2 => val1 === val2);

export const incaseTuple = (tuple) => incase((tupleVal) => {
  return tupleVal.filter((val, index) => val === tuple[index]).length === tuple.length;
});

export const match = (value) => (...caseAppliers) => {
  let matched = false;
  let finalVal;
  const signalMatched = () => matched = true;
  caseAppliers.forEach(applyCase => {
    if (!matched) {
      finalVal = applyCase(value, signalMatched);
    }
  });
  return finalVal;
};
