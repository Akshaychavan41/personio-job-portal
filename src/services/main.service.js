import axios from "axios";

export const getCandidatesList = async () => {
  return await axios.get(
    `http://personio-fe-test.herokuapp.com/api/v1/candidates`
  );
};
