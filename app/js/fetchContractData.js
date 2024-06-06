const fetchContractData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contractData = await response.json();
    return contractData;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    return null;
  }
};
