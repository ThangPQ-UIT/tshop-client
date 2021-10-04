import { format } from 'date-fns'
const formatDate = (date) => format(date, 'dd/MM/yyyy')
const formatDateAndMonth = (date) => format(date, 'dd/LLL/yyyy')

export { formatDate, formatDateAndMonth }