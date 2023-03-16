export const getDates = async () => {
  const config = useRuntimeConfig();
  const options = {
    method: "GET",
    headers: {
      Host: `${config.HOST}`,
      Authorization: `${config.API_TOKEN}`,
    },
  } as any;
  const dates = await useFetch(`${config.API_URL}api/v1/dates/`, options).then(
    (res) => {
      const data: any = res.data.value;
      const error = res.error.value;
      if (error) {
        // dealing error
        console.log(error);
      } else {
        return data;
      }
    }
  );
  console.log(dates);
  return dates;
};
