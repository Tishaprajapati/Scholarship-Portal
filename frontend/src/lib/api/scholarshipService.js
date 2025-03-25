import axios from "axios";

const BASE_URL = "http://localhost:9000/api";

export const searchScholarships = async (params) => {
  try {
    const { title, minAmount, maxAmount, studentType } = params;
    const response = await axios.get(
      `${BASE_URL}/scholarship/search/scholarships`,
      {
        params: {
          title,
          minAmount,
          maxAmount,
          studentType,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching scholarships:", error);
    throw error;
  }
};
