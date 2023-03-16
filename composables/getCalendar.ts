export const getDates = async () => {
  const config = useRuntimeConfig();
  const options = {
    method: "GET",
    headers: {
      Host: `${config.HOST}`,
      Authorization: `${config.API_TOKEN}`,
    },
  } as any;
  const calendar_dates = await useFetch(
    `${config.API_URL}api/v1/calendar/`,
    options
  ).then((res) => {
    const data: any = res.data.value;
    const error = res.error.value;
    if (error) {
      // dealing error
      console.log(error);
    } else {
      return data;
    }
  });
  console.log(calendar_dates);
  return calendar_dates;
};
