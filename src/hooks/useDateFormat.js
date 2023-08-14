export const useDateFormat = () => {
  const formatDate = (dateStr, formatType) => {
    const date = new Date(dateStr);
    let options = {};

    if (formatType === 'dd/mmmm/yyyy') {
      options = { day: 'numeric', month: 'long', year: 'numeric' };
    } else if (formatType === 'dd/mm') {
      options = { day: 'numeric', month: 'numeric' };
    } else if (formatType === 'dd/mm/yyyy') {
      options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    } else if (formatType === 'dayOfWeek') {
      options = { weekday: 'long' };
    }
    return date.toLocaleDateString('en-GB', options);
  };

  return {
    formatDate,
  };
};
