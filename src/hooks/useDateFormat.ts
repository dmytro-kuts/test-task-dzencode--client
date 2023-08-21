import { useTranslation } from 'react-i18next';

interface DateFormat {
  formatDate: (
    dateStr: any,
    formatType: 'dd/mmmm/yyyy' | 'dd/mm' | 'dd/mm/yyyy' | 'dayOfWeek',
  ) => string;
}

export const useDateFormat = (): DateFormat => {
  const { i18n } = useTranslation();

  const formatDate = (
    dateStr: string,
    formatType: 'dd/mmmm/yyyy' | 'dd/mm' | 'dd/mm/yyyy' | 'dayOfWeek',
  ): string => {
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
    return date.toLocaleDateString(`${i18n.language}-GB`, options);
  };

  return {
    formatDate,
  };
};
