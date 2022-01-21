import dayjs from "dayjs";

export const BASE_DATE_FORMAT='DD.MM.YYYY hh:mm:ss'

export const formatDate=(date, format)=>{
   return dayjs(date).format(format)
}